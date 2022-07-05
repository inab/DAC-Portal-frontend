// IMPORT MONGOOSE MODELS.
import { User } from '../models/user';
import { DacRequests } from '../models/dac-requests';
import { DacData } from '../models/dac-data';

/* FUNCTIONS */

/* 1. MONGO DB: */

// 1.A. GET POLICIES BY FILE-ID
const getPolicies = async (file) => {
    const response = await DacData.find({ 'files.fileId' : file })
                                  .select({'_id' : 0, 'files.$' : 1 });
    return response
}

// 1.B. CHECK IF THERE IS ANY DAC CONTROLLING A SPECIFIC DATASET
const getRequestedFileData = async (file) => {

    const { dacId } = await DacData.findOne({ 'files.fileId' : file })
                                   .select({'_id' : 0, 'dacId': 1 }) || {};
    
    const { files } = await DacData.findOne({ 'files.fileId' : file })
                                   .select({'_id' : 0, 'files.acl.$': 1 }) || {};

    if(!(dacId || files )) return

    return {
        dacId: dacId,
        resource: files[0].acl.split(":").slice(1).join(":")
    }
}

// 1.C BUILD REQUEST OBJECT FROM FILE INFORMATION AND USER REQUEST METADATA
const buildRequestObject = (file, resource, comments, status) => {
    return {
        fileId: file,
        resource: resource,
        comment: comments,
        status: status
    }
}

// 1.D. POST A USER REQUEST FOR A SPECIFIC DAC
const postRequest = async (id, dacId, request) => {

    let userReq = { 'user': id, 'requests': [request] }

    let dacReq = { 'dacId' : dacId, 'requests' : [userReq] }

    let dac =  await DacRequests.find({ 'dacId' : dacId })
                                .select({'_id' : 0 });
    
    let user = await DacRequests.find({ 'dacId' : dacId, 'requests.user' : id })
                                .select({'_id' : 0 });

    let response = [];

    if(dac.length === 0) {
        response = await DacRequests.create({ 'dacId' : dacReq.dacId, 'requests' : dacReq.requests });
    } else if(user.length === 0) {
        response = await DacRequests.findOneAndUpdate(
            { 'dacId' : dacId },
            { $addToSet : { 'requests' : userReq } },
            { new: true });
    } else {
        response = await DacRequests.findOneAndUpdate(
            { 'dacId' : dacId, 'requests.user' : id },
            { $addToSet : { "requests.$.requests" : request } },
            { new: true }); 
    } 

    return response
}
// 1.E. GET REQUESTS STATUS BY USER ID
const getRequestsStatus = async (id) => {
    const response = await User.find({ 'sub' : id })
                               .select({ 'status' : 1, '_id' : 0});
    return response
}  

exports.getPolicies = getPolicies;
exports.postRequest = postRequest;
exports.getRequestsStatus = getRequestsStatus;
exports.getRequestedFileData = getRequestedFileData;
exports.buildRequestObject = buildRequestObject;
