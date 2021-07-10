const cors = require('cors');
const mongoose = require('mongoose');
const startupDebugger = require('debug')('app:startup');
const config = require('config');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const auth = require('./middleware/auth');
const log = require('./middleware/logger');
const path = require('path');
const app = express();  

const user = require('./routes/user');
const login = require('./routes/login');

// load the environment variable first
if(!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    // exite process in case of error..
    process.exit(1);
}
// db connection
mongoose.connect('mongodb://localhost:27017/auto-clnic', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('Connected to database..')
});

// middleware
app.use(cors({
    origin: '*',
    exposedHeaders: ['Content-Length', 'x-auth-token']
}));
app.use(express.json());
// app.use(log);
app.use(express.static(__dirname + '/public/'));
app.use(helmet());

// login route
app.use('/login', login);
// route guard
app.use(auth);
app.use('/api/users', user);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname +' /public/index.html'));
});

// configuration
console.log('Application Name:' + config.get('name'));
console.log('mail Server :' + config.get('mail.host'));
console.log('mail Server :' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

const port = process.env.PORT || 3000;
console.log(port);

app.listen(port, '192.168.254.103', () => {
    console.log(`Server is listening at port: ${port}`);
});