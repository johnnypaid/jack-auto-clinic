const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { AppProd, validate } = require('../model/production');


router.get('/', async (req, res) => {

    try {
        var pageNumber = 1;
        var nPerPage = 4;
        prodData = {};

        const prodInfo =  await AppProd.find().countDocuments();
    
        const result = await AppProd.find()
                        .skip(pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0)
                        .limit(nPerPage);

        prodData['prodInfo'] = prodInfo;           
        prodData['data'] = result;           
        res.send(prodData);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:page', async (req, res) => {

    console.log(req.params.page);

    try {
        var pageNumber = req.params.page;
        var nPerPage = 4;
        prodData = {};

        const prodInfo =  await AppProd.find().countDocuments();
    
        const result = await AppProd.find()
                        .skip(pageNumber > 0 ? ( ( pageNumber - 1 ) * nPerPage ) : 0)
                        .limit(nPerPage);

        prodData['prodInfo'] = prodInfo;           
        prodData['data'] = result;           
        res.send(prodData);
    } catch (error) {
        console.log(error);
    }
});

router.get('/:option/:key', async (req, res) => {

    var field = req.params.option;
    var key = req.params.key;

    console.log(field);
    
    result = {};
    prodCount = {};
    resCount = 0;
    prodData = {};

    try {
        if (field === 'sold_to') {
            resCount = await AppProd.find({'sold_to': key }).countDocuments();
            result = await AppProd.find({'sold_to': key });
        }
        if (field === 'chassisNum') {
            result = await AppProd.find({'chassisNum': key });
        }
        if (field === 'date') {
            var sDate = key + 'T00:00:00.000+00:00';
            var newDate = key.slice(5, 7);
            var pattern = /^0[0-9].*$/
            console.log(newDate);
            prodCount = {};
            result = {};

            resCount = await AppProd.find({'conDate': { "$gte": sDate}}).countDocuments();
            result = await AppProd.find({'conDate': { "$gte": sDate}}).sort({conDate: 1});
        }
        if (field === 'default') {
            resCount = await AppProd.find().countDocuments();
            result = await AppProd.find();
        }

        prodData = {};
        prodData['prodCount'] = resCount;
        prodData['result'] = result;
        console.log(prodData);
        res.send(prodData);
    } catch (error) {
        res.send(error);
    }
});

router.get('/:option/:key/:page', (rea, res) => {
    console.log(req.params);
});

router.post('/', async (req, res) => {

    console.log(req.body);
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.message);

    let chassis = await AppProd.findOne({chassisNum: req.body.chassisNum});
    if (chassis) return res.status(400).send('Chassis number already exist..');

    try {
        newEntry = new AppProd(_.pick(req.body, 
            [
                'chassisNum', 'conversion', 'conDate', 'con_stat', 
                'painting', 'paint_started', 'paint_stat', 
                'mechanical', 'mec_started', 'mec_stat',
                'electrical', 'elec_started', 'elec_stat',
                'upholstery', 'up_started', 'up_stat',
                'trimmer', 'trim_started', 'trim_stat',
                'dashboard', 'dash_started', 'dash_stat',
                'detailing', 'det_started', 'det_stat',
                'qc', 'qc_started', 'qc_stat', 'sold_to'                                
            ]));

        const entry = await newEntry.save();

        res.send(entry);
    } catch (error) {
        res.send(error.message);
    }
    
});

router.put('/:id', async (req, res) => {
    console.log(req.body);
    console.log(req.params.id);

    // const {error} = validate(req.body);
    // if (error) return res.status(400).send(error.message);

    try {
        const findEntry = await AppProd.findByIdAndUpdate(req.params.id, 
            {   
                chassisNum: req.body.chassisNum,
                conversion: req.body.conversion,
                conDate: req.body.conDate,
                con_stat: req.body.con_stat,
                painting: req.body.painting,
                paint_started: req.body.paint_started,
                paint_stat: req.body.paint_stat,
                mechanical: req.body.mechanical,
                mec_started: req.body.mec_started,
                mec_stat: req.body.mec_stat,
                electrical: req.body.electrical,
                elec_started: req.body.elec_started,
                elec_stat: req.body.elec_stat,
                upholstery: req.body.upholstery,
                up_started: req.body.up_started,
                up_stat: req.body.up_stat,
                trimmer: req.body.trimmer,
                trim_started: req.body.trim_started,
                trim_stat: req.body.trim_stat,
                dashboard: req.body.dashboard,
                dash_started: req.body.dash_started,
                dash_stat: req.body.dash_stat,
                detailing: req.body.detailing,
                det_started: req.body.det_started,
                det_stat: req.body.det_stat,
                qc: req.body.qc,
                qc_started: req.body.qc_started,
                qc_stat: req.body.qc_stat,
                sold_to: req.body.sold_to,

            },{new: true});

        if (!findEntry) return res.status(404).send('Cand find entry with the given chassis id number.');

        res.send(findEntry);       
    } catch (error) {
        res.send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const delEntry = await AppProd.findByIdAndRemove(req.params.id);

    if (!delEntry) return res.status(404).send('Could not delete entry with the given ID..');

    res.send(delEntry);
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;