import mongoose from 'mongoose';

const assertionsSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    asserted: { 
        type: Number, 
        required: true,
        min: 0,
        max: 1510000000
    },
    value: { 
        type: String,
        required: true
    },
    source: { 
        type: String,
        required: true
    }, 
    by: {
        type: String,
        required: true      
    }
});

export { assertionsSchema }