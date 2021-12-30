import mongoose from 'mongoose';

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
        }
    }],
    members: [{
        type: String,
        required: true
    }]
},{ collection: 'dacs' });

const DacData = mongoose.model('dacs', dacDataSchema);

exports.DacData = DacData;
