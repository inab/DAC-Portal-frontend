import mongoose from 'mongoose';
import Joi from 'joi';

const dacDataSchema = new mongoose.Schema({
    dacId: {
        type: String,
        required: true
    },
    files: [{
        fileId: {
            type: String,
            required: true
        },
        policy: {
            type: String,
            required: true
        },
        acl: {
            type: String,
            required: true
        }
    }],
    members: [{
        type: String,
        required: true
    }],
    info: {
        dacName: {
            type: String,
            required: true
        },
        dacStudy: {
            type: String,
            required: true
        },
        datasets: {
            type: String,
            required: true
        },
        adminName: {
            type: String,
            required: true
        },
        adminSurname: {
            type: String,
            required: true
        },
        emailAddress: {
            type: String,
            required: true
        },
        studyDescription: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true
        }
    }
},{ collection: 'dacs' });

const db = mongoose.connection.useDb('dac-portal-api');

const DacData = db.model('dacs', dacDataSchema);

function validatePolicies(queryObject){
    const schema = Joi.object().keys({
        dacId: Joi.string().length(14).required(),
        dsId: Joi.string().required(),
        policy:  Joi.string().required()
    })   
    return schema.validate(queryObject);
}

export { DacData, validatePolicies }