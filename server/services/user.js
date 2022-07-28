// IMPORT MONGOOSE MODELS.
import { DacRequests } from '../models/DAC-Portal/dac-requests';
import { DacData } from '../models/DAC-Portal/dac-data';

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
const buildRequestObject = (id, file, resource, comments) => {
    return {
        user: id,
        fileId: file,
        resource: resource,
        comment: comments,
        status: "Pending"
    }
}

// 1.E SET USER REQUEST DATA (DAC VIEW)
const setUserRequestData = async (dacId, request) => {

    let dacReq = { 'dacId' : dacId, 'requests' : [request] }

    let dac =  await DacRequests.find({ 'dacId' : dacId })
                                .select({'_id' : 0 });

    let response = [];

    if(dac.length === 0) {
        response = await DacRequests.create([{ 'dacId' : dacReq.dacId, 'requests' : dacReq.requests }]);
    } else {
        response = await DacRequests.findOneAndUpdate(
            { 'dacId' : dacId },
            { $addToSet : { "requests" : request } },
            { new: true }); 
    } 

    return response
}

// 1.H. GET REQUESTS BY USER ID
const getRequestsStatus = async (id) => {
    const response = await DacRequests.aggregate([
        { $unwind: "$requests" },
        { $match: { 'requests.user': id } },
        { $project: {  
            fileId: '$requests.fileId', 
            resource: '$requests.resource', 
            comment: '$requests.comment',
            status: '$requests.status' }
        }
    ])

    return response
}

export { getPolicies, getRequestsStatus, getRequestedFileData, buildRequestObject, setUserRequestData }