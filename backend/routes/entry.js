const auth = require('../middleware/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { AppEntry, validate } = require('../model/entry');


router.get('/', auth, async (req, res) => {
    const result = await AppEntry.find();
    res.send(result);
});

router.post('/', async (req, res) => {
    console.log('entry')
    console.log(req.body);
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.message);

    let result = await AppEntry.findOne({email: req.body.engineNum});
    if (result) return res.status(400).send('Engine already exist..');

    // hash password
    newEntry = new AppEntry(_.pick(req.body, ['chassisNum', 'engineNum', 'bodyCode', 'supplier', 'containerNum', 'unitDesc']));

    // const salt = await bcrypt.genSalt(10);
    // appuser.password = await bcrypt.hash(appuser.password, salt)

    const entry = await newEntry.save();

    res.send(entry);
});

module.exports = router;