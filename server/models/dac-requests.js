import mongoose from 'mongoose';

const dacRequestsSchema = new mongoose.Schema({
    dacId: {
        type: String,
        required: true
    },
    requests: [{
        user: {
            type: String,
            required: true
        },
        requests: [{
            fileId: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            },
            resource: {
                type: String,
                required: true
            }
        }]
    }]
},{ collection: 'dac-requests' });

const DacRequests = mongoose.model('dac-requests', dacRequestsSchema);

exports.DacRequests = DacRequests;
