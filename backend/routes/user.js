const auth = require('../middlewaare/auth');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { AppUser, validate } = require('../model/user');


router.get('/', auth, async (req, res) => {
    const result = await AppUser.find();
    res.send(result);
});

router.get('/:name', auth, async (req, res) => {
    let result = await AppUser.findOne({name: req.params.name});
    if (!result) return res.status(400).send('No user found..');

    res.send(result);
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.message);

    let result = await AppUser.findOne({email: req.body.email});
    if (result) return res.status(400).send('User already registered.');

    // hash password
    appuser = new AppUser(_.pick(req.body, ['name', 'email', 'password', 'isAdmin']));
    const salt = await bcrypt.genSalt(10);
    appuser.password = await bcrypt.hash(appuser.password, salt)

    const newuser = await appuser.save();

    res.send(_.pick(appuser, ['_id', 'name', 'email', 'isAdmin']));
});

router.put('/:id', (req, res) => {
    const user = users.find(el => el.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User doesn\'t exist...');

    const { error } = validateUser(req.body);
    if(error) return  res.status(400).send(error.message);

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password

    res.send(user);
});

router.delete('/:id', (req,res) => {
    const user = AppUser.find(el => el.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('No user to delete...');

    const index = AppUser.indexOf(user);
    AppUser.splice(index, 1);

    res.send(users);
});

module.exports = router;