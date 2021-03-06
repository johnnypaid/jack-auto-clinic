const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: {
        type: Boolean,
        required: true
    }
});

// userSchema.methods.generateAuthToken = async function() {
//     const token = jwt.sign({name: this.name, email: this.email, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
//     return token;
// }

const AppUser = mongoose.model('AppUser', userSchema);

function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().min(5).max(1024).required(),
        isAdmin: Joi.boolean().default(false).required()
    });

   return schema.validate(user);
}

module.exports.AppUser = AppUser;
module.exports.validate = validateUser;