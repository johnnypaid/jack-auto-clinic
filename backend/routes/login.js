const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { AppUser} = require('../model/user');
const Joi = require('joi');


router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    let user = await AppUser.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    res.send(true);
});

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });

   return schema.validate(user);
}

module.exports = router;