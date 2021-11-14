// IMPORT MONGOOSE MODELS.
import { User } from '../models/user';

/* FUNCTIONS */

/* 1. MONGO DB: */

// 1.a. GET REQUESTS STATUS BY USER ID

const getRequestsStatus = async (id) => {
    const response = await User.find({ 'sub' : id })
                               .select({ 'status' : 1, '_id' : 0});

    return response
}

exports.getRequestsStatus = getRequestsStatus;