const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { AppRegister, validate } = require('../model/register');


router.get('/', async (req, res) => {
    const result = await AppRegister.find();
    res.send(result);
});
router.get('/:option/:key', async (req, res) => {

    const field = req.params.option;
    const key = req.params.key;
    let result = {};

    try {
        if (field === 'engineNum') {
            result = await AppRegister.find({'engineNum': key });
        }
    
        if (field === 'chassisNum') {
            result = await AppRegister.find({'chassisNum': key });
        }
    
        if (field === 'bodyCode') {
            result = await AppRegister.find({'bodyCode': key });
        }

        if (field === 'date') {
            console.log(key);

            var sDate = new Date('2021-08-01');
            result = await AppRegister.find({'date': { "$gte": new Date(key)}});
        }

        console.log(result);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

router.post('/', async (req, res) => {

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.message);

    let result = await AppEntry.findOne({engineNum: req.body.engineNum});
    if (result) return res.status(400).send('Engine already exist..');

    let chasis = await AppEntry.findOne({chassisNum: req.body.chassisNum});
    if (chasis) return res.status(400).send('Chassis number already exist..');

    let bodycode = await AppEntry.findOne({bodyCode: req.body.bodyCode});
    if (bodycode) return res.status(400).send('Body code already exist..');

    try {
        newEntry = new AppEntry(_.pick(req.body, ['_id','chassisNum', 'engineNum', 'bodyCode', 'supplier', 'containerNum', 'unitDesc']));

        const entry = await newEntry.save();

        res.send(entry);
    } catch (error) {
        res.send(error.message);
    }
    
});

router.put('/:id', async (req, res) => {
    // console.log(req.body);
    // console.log(req.params.id);

    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.message);

    try {
        const findEntry = await AppEntry.findByIdAndUpdate(req.params.id, 
            {   
                chassisNum: req.body.chassisNum,
                engineNum: req.body.engineNum,
                bodyCode: req.body.bodyCode,
                supplier: req.body.supplier,
                containerNum: req.body.containerNum,
                unitDesc: req.body.unitDesc
            },{new: true});

        if (!findEntry) return res.status(404).send('Cand find entry with the given engine number.');

        res.send(findEntry);       
    } catch (error) {
        res.send(error.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const delEntry = await AppEntry.findByIdAndRemove(req.params.id);

    if (!delEntry) return res.status(404).send('Could not delete entry with the given ID..');

    res.send(delEntry);
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;