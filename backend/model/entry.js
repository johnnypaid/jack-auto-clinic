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
    make: {
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
    dateArrived: {
        type: Date,
        required: true,
    },
    model: {
        type: String,
        required: true
    },
    valve: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    driveType: {
        type: String,
        required: true
    },
    speed: {
        type: String,
        required: true
    },
    bodyEye: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    yard: {
        type: String,
        required: true
    },
    reconCrd: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    unitDesc: {
        type: String
    },
    latestUpdated: { type: Date, default: Date.now },
});

const AppEntry = mongoose.model('AppEntry', entrySchema);

function validateEntry(entry) {
    const schema = Joi.object({
        id: Joi.string().optional(),
        chassisNum: Joi.string().required(),
        engineNum: Joi.string().required(),
        bodyCode: Joi.string().required(),
        make: Joi.string().required(),
        supplier: Joi.string().required(),
        containerNum: Joi.string().required(),
        dateArrived: Joi.string().required(),
        model: Joi.string().required(),
        valve: Joi.string().required(),
        body: Joi.string().required(),
        driveType: Joi.string().required(),
        speed: Joi.string().required(),
        bodyEye: Joi.string().required(),
        color: Joi.string().required(),
        yard: Joi.string().required(),
        reconCrd: Joi.string().required(),
        company: Joi.string().required(),
        unitDesc: Joi.string().allow('')
    });

   return schema.validate(entry);
}

module.exports.AppEntry = AppEntry;
module.exports.validate = validateEntry;