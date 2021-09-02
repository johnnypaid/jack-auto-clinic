const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const { AppEntry } = require('../model/entry');
const { AppRegister } = require('../model/registration');
const { AppProd} = require('../model/production');

router.get('/:chasis', async (req, res) => {
    let mainResult = {};
    try {
        console.log(req.params);
        let entry = await AppEntry.findOne({'chassisNum': req.params.chasis});
        if (entry) {
            mainResult.entry = entry;
        } else {
            mainResult.entry = '';
        }
        
        let registry = await AppRegister.findOne({'chassisNum': req.params.chasis});
        if (registry) {
            mainResult.registry = registry;
        } else {
            mainResult.registry = '';
        }

        let production = await AppProd.findOne({'chassisNum': req.params.chasis});
        if (production) {
            mainResult.production = production;
        } else {
            mainResult.production = '';
        }

        res.send(mainResult);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;