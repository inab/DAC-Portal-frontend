import mongoose from 'mongoose';

const userRequestsSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
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
}, { collection: 'user-requests' });

export { userRequestsSchema }
