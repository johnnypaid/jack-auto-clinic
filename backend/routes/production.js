const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { AppProd, validate } = require('../model/production');


router.get('/', async (req, res) => {
    const result = await AppProd.find();
    res.send(result);
});
router.get('/:option/:key', async (req, res) => {

    const field = req.params.option;
    const key = req.params.key;
    let result = {};

    try {
        if (field === 'sold_to') {
            result = await AppProd.find({'sold_to': key });
        }
        if (field === 'chassisNum') {
            result = await AppProd.find({'chassisNum': key });
        }
        if (field === 'bodyType') {
            result = await AppProd.find({'bodyType': key });
        }
        if (field === 'date') {
            console.log(key);

            var sDate = new Date('2021-08-01');
            result = await AppProd.find({'date': { "$gte": new Date(key)}});
        }

        console.log(result);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
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