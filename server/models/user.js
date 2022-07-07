import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    sub: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    status: [{
        fileId: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        }
    }],
}, { collection: 'user' });

const User = mongoose.model('user', userSchema);

export { User }

