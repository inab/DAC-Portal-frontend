// IMPORT MONGOOSE MODELS.
import mongoose from 'mongoose';
import { User } from '../models/DAC-Portal/user';
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
const buildRequestObject = (file, resource, comments) => {
    return {
        fileId: file,
        resource: resource,
        comment: comments,
        status: "Pending"
    }
}

// 1.D CREATE A TRANSACTION FOR STORING USER REQUEST DATA (collections: user (USER-VIEW) - dac-requests (DAC VIEWS))
const requestTransaction = async (id, dacId, request) => {
    const session = await mongoose.startSession();

    let isCompleted = false;

    try {
        session.startTransaction();
        await setUserRequestData(id, dacId, request, session)
        await setUserRequestStatus(id, request, session)
        await session.commitTransaction();
    } catch (e) {
        await session.abortTransaction();
        return { response: false };
    } finally {
        if (session.transaction.state === "TRANSACTION_COMMITTED") {
            isCompleted = true;
        } else {
            isCompleted = false;
        }
        await session.endSession();
        return { response: isCompleted };
    }
}


// 1.E SET USER REQUEST DATA (DAC VIEW)
const setUserRequestData = async (id, dacId, request, session) => {

    let userReq = { 'user': id, 'requests': [request] }

    let dacReq = { 'dacId' : dacId, 'requests' : [userReq] }

    let dac =  await DacRequests.find({ 'dacId' : dacId })
                                .select({'_id' : 0 });
    
    let user = await DacRequests.find({ 'dacId' : dacId, 'requests.user' : id })
                                .select({'_id' : 0 });

    let response = [];

    if(dac.length === 0) {
        response = await DacRequests.create([{ 'dacId' : dacReq.dacId, 'requests' : dacReq.requests }], { session });
    } else if(user.length === 0) {
        response = await DacRequests.findOneAndUpdate(
            { 'dacId' : dacId },
            { $addToSet : { 'requests' : userReq } },
            { new: true, session });
    } else {
        response = await DacRequests.findOneAndUpdate(
            { 'dacId' : dacId, 'requests.user' : id },
            { $addToSet : { "requests.$.requests" : request } },
            { new: true, session }); 
    } 

    return response
}

// 1.F SET USER REQUEST STATUS (USER VIEW)
const setUserRequestStatus = async (id, request, session) => {
    let fileStatusObject = {
        fileId: request.fileId,
        status: "Pending"
    }
    let user = await User.find({ 'sub' : id })
                         .select({'_id' : 0 });

    let response;

    if(user.length === 0){
        response = await User.create([{ 'sub': id, 'status': fileStatusObject }], { session });
    } else {
        response = await User.findOneAndUpdate(
            { 'sub': id },
            { $addToSet: { "status" : fileStatusObject }},
            { new: true, session }
        )
    }

    return response
}

// 1.G. GET REQUESTS STATUS BY USER ID
/*const getRequestsStatus = async (id) => {
    const response = await User.find({ 'sub' : id })
                               .select({ 'status' : 1, '_id' : 0});
    return response
}*/

// 1.H. GET USER REQUESTS ASSIGNED BY USERID
const getRequestsStatus = async (id) => {
    const response = await DacRequests.find({ 'requests.user': id })
                                      .select({ '_id': 0, 'requests.requests.$': 1 });

    return response
}


export { getPolicies, getRequestsStatus, getRequestedFileData, buildRequestObject, requestTransaction }