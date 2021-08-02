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
        if (field === 'engineNum') {
            result = await AppProd.find({'engineNum': key });
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

    let result = await AppProd.findOne({engineNum: req.body.engineNum});
    if (result) return res.status(400).send('Registration data already exist..');

    let chasis = await AppProd.findOne({plateNum: req.body.plateNum});
    if (chasis) return res.status(400).send('Registration data already exist..');

    let bodycode = await AppProd.findOne({chassisNum: req.body.chassisNum});
    if (bodycode) return res.status(400).send('Body code already exist..');

    try {
        newEntry = new AppProd(_.pick(req.body, ['_id','bodyType', 'chassisNum', 'color', 'date', 'engineNum', 'mvNum', 'name', 'plateNum']));

        const entry = await newEntry.save();

        res.send(entry);
    } catch (error) {
        res.send(error.message);
    }
    
});

router.put('/:id', async (req, res) => {
    console.log(req.body);
    // console.log(req.params.id);

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.message);

    try {
        const findEntry = await AppProd.findByIdAndUpdate(req.params.id, 
            {   
                chassisNum: req.body.chassisNum,
                engineNum: req.body.engineNum,
                bodyType: req.body.bodyType,
                name: req.body.name,
                color: req.body.color,
                dateEdited: new Date(),
                mvNum: req.body.mvNum

            },{new: true});

        if (!findEntry) return res.status(404).send('Cand find entry with the given engine number.');

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