// IMPORT MONGOOSE MODELS.
import { DacMember } from '../models/dac-member';

/* FUNCTIONS */

/* 1. MONGO DB: */

// 1.a. GET USER REQUESTS ASSIGNED TO THIS DAC-MEMBER BY ID -> EVENTUALLY, THIS QUERY WILL USE DAC-ID INSTEAD (WE DON'T HAVE DAC IDs YET) 

const getUserRequests = async (id) => {
    const response = await DacMember.find({ 'sub' : id })
                                    .select({ 'requests' : 1, '_id' : 0});

    return response
}

exports.getUserRequests = getUserRequests;