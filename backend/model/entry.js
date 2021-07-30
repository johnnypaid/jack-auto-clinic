const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const entrySchema = new mongoose.Schema({
    chassisNum: {
        type: String,
        required: true,
    },
    engineNum: {
        type: String,
        required: true,
        unique: true
    },
    bodyCode: {
        type: String,
        required: true,
    },
    supplier: {
        type: String,
        required: true,
    },
    containerNum: {
        type: String,
        required: true,
    },
    unitDesc: {
        type: String
    },
    date: { type: Date, default: Date.now },
});

const AppEntry = mongoose.model('AppEntry', entrySchema);

function validateEntry(entry) {
    const schema = Joi.object({
        id: Joi.string().optional(),
        chassisNum: Joi.string().required(),
        engineNum: Joi.string().required(),
        bodyCode: Joi.string().required(),
        supplier: Joi.string().required(),
        containerNum: Joi.string().required(),
        unitDesc: Joi.string().allow('')
    });

   return schema.validate(entry);
}

module.exports.AppEntry = AppEntry;
module.exports.validate = validateEntry;