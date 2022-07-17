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
            },
            status: {
                type: String,
                required: true
            }
        }]
    }]
},{ collection: 'dac-requests' });

const db = mongoose.connection.useDb('dac-portal-api');

const DacRequests = db.model('dac-requests', dacRequestsSchema);

export { DacRequests }
