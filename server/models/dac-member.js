import mongoose from 'mongoose';

const dacMemberSchema = new mongoose.Schema({
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
            status: {
                type: String,
                required: true
            }
        }]
    }]
},{ collection: 'dac-member' });

const DacMember = mongoose.model('dac-member', dacMemberSchema);

exports.DacMember = DacMember;
