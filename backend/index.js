const mongoose = require('mongoose');
const startupDebugger = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const auth = require('./middlewaare/auth');
const log = require('./middlewaare/logger');
const app = express();  

const user = require('./routes/user');
const login = require('./routes/login');

// db connection
mongoose.connect('mongodb://localhost:27017/auto-clnic', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('Connected to database..')
});

// middleware
app.use(express.json());
app.use(log);
app.use(auth);
app.use(express.static('public'));
app.use(helmet());

// routes
app.use('/', login);
app.use('/api/users', user);

// configuration
console.log('Application Name:' + config.get('name'));
console.log('mail Server :' + config.get('mail.host'));
console.log('mail Server :' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is listening at port: ${port}`);
});