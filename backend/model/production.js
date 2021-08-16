const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');

const productionSchema = new mongoose.Schema({
    updated: { 
        type: Date,
        default: Date.now
    },
    chassisNum: {
        type: String,
        requried: true,
        unique: true
    },
    conversion: {
        type: String
    },
    conDate: {
        type: Date
    },
    con_stat: {
        type: String
    },
    painting: { 
        type: String
    },
    paint_started: { 
        type: Date
    },
    paint_stat: {
        type: String
    },
    mechanical: { 
        type: String
    },
    mec_started: { 
        type: Date
    },
    mec_stat: {
        type: String
    },
    electrical: { 
        type: String
    },
    elec_started: { 
        type: Date
    },
    elec_stat: { 
        type: String
    },
    upholstery: { 
        type: String
    },
    up_started: { 
        type: Date
    },
    up_stat: { 
        type: String
    },
    trimmer: { 
        type: String
    },
    trim_started: { 
        type: Date
    },
    trim_stat: { 
        type: String
    },
    dashboard: { 
        type: String
    },
    dash_started: { 
        type: Date
    },
    dash_stat: { 
        type: String
    },
    detailing: { 
        type: String
    },
    det_started: { 
        type: Date
    },
    det_stat: { 
        type: String
    },
    qc: { 
        type: String
    },
    qc_started: { 
        type: Date
    },
    qc_stat: { 
        type: String
    },
    sold_to: { 
        type: String
    }
});

const AppProd = mongoose.model('AppProd', productionSchema);

function validateEntry(entry) {
    const schema = Joi.object({
        id: Joi.string().optional(),
        updated: Joi.string().optional(),
        conversion: Joi.string().allow(null, '').optional(),
        conDate: Joi.string().allow(null, '').optional(),
        con_stat: Joi.string().allow(null, '').optional(),
        chassisNum: Joi.string().required(),
        painting: Joi.string().allow(null, '').optional(),
        paint_started: Joi.string().allow(null, '').optional(),
        paint_stat: Joi.string().allow(null, '').optional(),
        mechanical: Joi.string().allow(null, '').optional(),
        mec_started: Joi.string().allow(null, '').optional(),
        mec_stat: Joi.string().allow(null, '').optional(),
        electrical: Joi.string().allow(null, '').optional(),
        elec_started: Joi.string().allow(null, '').optional(),
        elec_stat: Joi.string().allow(null, '').optional(),
        upholstery: Joi.string().allow(null, '').optional(),
        up_started: Joi.string().allow(null, '').optional(),
        up_stat: Joi.string().allow(null, '').optional(),
        trimmer: Joi.string().allow(null, '').optional(),
        trim_started: Joi.string().allow(null, '').optional(),
        trim_stat: Joi.string().allow(null, '').optional(),
        dashboard: Joi.string().allow(null, '').optional(),
        dash_started: Joi.string().allow(null, '').optional(),
        dash_stat: Joi.string().allow(null, '').optional(),
        detailing: Joi.string().allow(null, '').optional(),
        det_started: Joi.string().allow(null, '').optional(),
        det_stat: Joi.string().allow(null, '').optional(),
        qc: Joi.string().allow(null, '').optional(),
        qc_started: Joi.string().allow(null, '').optional(),
        qc_stat: Joi.string().allow(null, '').optional(),
        sold_to: Joi.string().allow(null, '').optional()
    });

   return schema.validate(entry);
}

module.exports.AppProd = AppProd;
module.exports.validate = validateEntry;