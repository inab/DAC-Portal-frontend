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
    }]
},{ collection: 'dacs' });

const DacData = mongoose.model('dacs', dacDataSchema);

function validatePolicies(queryObject){
    const schema = Joi.object().keys({
        dacId: Joi.string().length(14).required(),
        dsId: Joi.string().required(),
        policy:  Joi.string().required()
    })   
    return schema.validate(queryObject);
}

exports.DacData = DacData;
exports.validatePolicies = validatePolicies;
