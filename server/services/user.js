// IMPORT MONGOOSE MODELS.
import { User } from '../models/user';
import { DacRequests } from '../models/dac-requests';
import { DacData } from '../models/dac-data';

/* FUNCTIONS */

/* 1. MONGO DB: */

// 1.a. GET POLICIES BY FILE-ID

const getPolicies = async (file) => {
    const response = await DacData.find({ 'files.fileId' : file })
                                  .select({'_id' : 0, 'files.$' : 1 });
    return response
}

// 1.b. POST REQUESTS BY USER-ID AND FILE-ID

const postRequest = async (id, file, comments) => {
    const getDacId = await DacData.find({ 'files.fileId' : file })
                                  .select({'_id' : 0, 'dacId': 1 });

    const getAcl = await DacData.find({ 'files.fileId' : file })
                                     .select({'_id' : 0, 'files.acl.$': 1 });

    const resource = getAcl[0].files[0].acl.split(":").slice(1).join(":");

    let request = {
        'fileId' : file,
        'resource' : resource,
        'comment' : comments,
        'status' : "Pending"
    }

    let userReq = {
        'user': id,
        'requests': [request]
    }

    let dacReq = {
        'dacId' : getDacId[0].dacId,
        'requests' : [userReq]
    }

    let dac =  await DacRequests.find({'dacId' : getDacId[0].dacId})
                                .select({'_id' : 0 });
    
    let user = await DacRequests.find({'dacId' : getDacId[0].dacId, 'requests.user' : id})
                                .select({'_id' : 0 });

    let response = [];

    if(dac.length === 0) {
        response = await DacRequests.create({ 'dacId' : dacReq.dacId, 'requests' : dacReq.requests });
    } else if(user.length === 0) {
        response = await DacRequests.findOneAndUpdate(
            { 'dacId' : getDacId[0].dacId },
            { $addToSet : { 'requests' : userReq } },
            { new: true });
    } else {
        response = await DacRequests.findOneAndUpdate(
            { 'dacId' : getDacId[0].dacId, 'requests.user' : id },
            { $addToSet : { "requests.$.requests" : request } },
            { new: true }); 
    } 

    return response
}
// 1.c. GET REQUESTS STATUS BY USER ID
const getRequestsStatus = async (id) => {
    const response = await User.find({ 'sub' : id })
                                .select({ 'status' : 1, '_id' : 0});
    return response
}  

exports.getPolicies = getPolicies;
exports.postRequest = postRequest;
exports.getRequestsStatus = getRequestsStatus;