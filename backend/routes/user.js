const express = require('express');
const Joi = require('joi');
const router = express.Router();

const users = [
    {id: 1, name: 'teryo1', email: 'g@kwangol.com', password: 'sigibin1'},
    {id: 2, name: 'teryo2', email: 'g@kwangol.com', password: 'sigibin2'},
    {id: 3, name: 'teryo3', email: 'g@kwangol.com', password: 'sigibin3'},
];

router.get('/', (req, res) => {
    res.send(users);
});

router.get('/:id', (req, res) => {
    const user = users.find(el => el.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User doesn\'t exist...');
    res.send(user);
});

router.post('/', (req, res) => {
    const newUser = users.find(el => el.email === req.body.email);
    if (newUser) return res.status(403).send('User already exist...');

    const { error } = validateUser(req.body);
    if(error) return res.status(400).send(error.message);

    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    users.push(user);
    res.send(users);  
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
    const user = users.find(el => el.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('No user to delete...');

    const index = users.indexOf(user);
    users.splice(index, 1);

    res.send(users);
});

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().min(6).max(20).required()
    });

   return schema.validate(user);
}

module.exports = router;