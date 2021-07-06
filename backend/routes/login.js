const cors = require('cors');
const _ = require('lodash');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { AppUser} = require('../model/user');
const Joi = require('joi');

router.post('/', async (req, res) => {
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.message);

    // search email
    let user = await AppUser.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password.');

    // compare password
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid email or password.');

    // if all is well call jwt and add a payload to generate auth token
    const token = jwt.sign({name: user.name, email: user.email, isAdmin: user.isAdmin}, config.get('jwtPrivateKey'));

    res.header('x-auth-token', token).send(_.pick(user,['_id', 'name', 'email', 'isAdmin']));
});

function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });

   return schema.validate(user);
}

module.exports = router;