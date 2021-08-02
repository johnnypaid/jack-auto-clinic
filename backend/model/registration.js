const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const registerSchema = new mongoose.Schema({
    bodyType: {
        type: String,
        required: true,
    },
    chassisNum: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        required: true,
    },
    date: { 
        type: Date
    },
    dateEdited: { 
        type: Date,
        default: Date.now
    },
    engineNum: { 
        type: String,
        required: true
    },
    mvNum: { 
        type: String,
        required: true
    },
    name: { 
        type: String,
        required: true
    },
    plateNum: { 
        type: String,
        required: true
    },
});

const AppRegister = mongoose.model('AppRegister', registerSchema);

function validateEntry(entry) {
    const schema = Joi.object({
        id: Joi.string().optional(),
        bodyType: Joi.string().required(),
        chassisNum: Joi.string().required(),
        color: Joi.string().required(),
        date: Joi.string().optional(),
        dateEdited: Joi.string().optional(),
        engineNum: Joi.string().required(),
        mvNum: Joi.string().required(),
        name: Joi.string().required(),
        plateNum: Joi.string().required(),
    });

   return schema.validate(entry);
}

module.exports.AppRegister = AppRegister;
module.exports.validate = validateEntry;