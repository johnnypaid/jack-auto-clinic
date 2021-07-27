const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { AppEntry, validate } = require('../model/entry');


router.get('/', async (req, res) => {
    const result = await AppEntry.find();
    res.send(result);
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

        newEntry = new AppEntry(_.pick(req.body, ['chassisNum', 'engineNum', 'bodyCode', 'supplier', 'containerNum', 'unitDesc']));

        const entry = await newEntry.save();
        res.send(entry);
    
});

module.exports = router;