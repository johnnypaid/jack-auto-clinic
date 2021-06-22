const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const users = [
    {id: 1, name: 'teryo1', email: 'g@kwangol.com', password: 'sigibin1'},
    {id: 2, name: 'teryo2', email: 'g@kwangol.com', password: 'sigibin2'},
    {id: 3, name: 'teryo3', email: 'g@kwangol.com', password: 'sigibin3'},
];

app.get('/', (req, res) => {
    res.send('It works teryo!');
});

app.get('/api/users', (req, res) => {
    res.send(users);
});

app.get('/api/users/:id', (req, res) => {
    const user = users.find(el => el.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User doesn\'t exist...');
    res.send(user);
});

app.post('/api/users/', (req, res) => {
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

app.put('/api/users/:id', (req,res) => {
    const user = users.find(el => el.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('User doesn\'t exist...');

    const { error } = validateUser(req.body);
    if(error) return  res.status(400).send(error.message);

    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password

    res.send(user);
});

app.delete('/api/users/:id', (req,res) => {
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



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
});