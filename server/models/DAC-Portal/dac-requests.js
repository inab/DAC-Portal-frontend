import mongoose from 'mongoose';
import { userRequestsSchema } from './user-requests';

const dacRequestsSchema = new mongoose.Schema({
    dacId: {
        type: String,
        required: true
    },
    requests: [userRequestsSchema]
},{ collection: 'dac-requests' });

const db = mongoose.connection.useDb('dac-portal-api');

const DacRequests = db.model('dac-requests', dacRequestsSchema);

export { DacRequests }