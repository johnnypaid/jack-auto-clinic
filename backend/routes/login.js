const express = require('express');
const router = express.Router();
const { AppUser} = require('../model/user');
const Joi = require('joi');


router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    let result = await AppUser.findOne({email: req.body.email, password: req.body.password});
    if (!result) return res.status(400).send('Oops please check credentials...');

    res.send(result);
});

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });

   return schema.validate(user);
}

module.exports = router;