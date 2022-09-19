// IMPORT MONGOOSE MODELS.
import mongoose from 'mongoose';
import { DacRequests } from '../models/DAC-Portal/dac-requests';
import { DacData } from '../models/DAC-Portal/dac-data';
import { UserPermissions } from '../models/Permissions-API/user';

/* 1. MONGO DB: */

// 1.A. ACCEPT REQUEST TRANSACTION: DAC-PORTAL-DB: STATUS -> ACCEPTED, PERMISSIONS-API: ADD DATA PERMISSIONS. 
const acceptRequestTransaction = async (adminDacs, objectId, userId, resource) => {
    const session = await mongoose.startSession();

    let isCompleted = false;

    try {
        session.startTransaction();
        const firstResponse = await Promise.all(adminDacs.map(async (item) => {
            return await acceptRequestStatus(item.dacId, objectId, session)
        }))

        if(firstResponse === null) throw new Error("Status not updated")

        const secondResponse = await createUserPermissions(userId, resource, session)

        if(secondResponse === null) throw new Error("Permissions not updated")

        await session.commitTransaction();
    } catch (e) {
        console.log("error", e)
        await session.abortTransaction();
        return { response: false };
    } finally {
        session.transaction.state === "TRANSACTION_COMMITTED" ? isCompleted = true : isCompleted = false
        await session.endSession();
        return { response: isCompleted };
    }
}

// 1.A.1. ACCEPT REQUEST TRANSACTION: DAC-PORTAL-DB: STATUS -> ACCEPTED
const acceptRequestStatus = async (id, objectId, session) => {
    let response = await DacRequests.findOneAndUpdate(
        { 'dacId': id, 'requests._id': objectId },
        {  $set : { "requests.$.status" : "Accepted" }},
        {  new: true, session }
    );

    return response
}

// 1.A.2. ACCEPT REQUEST TRANSACTION: PERMISSIONS-API: ADD DATA PERMISSIONS
const createUserPermissions = async (id, resource, session) => {
    const assertion = {
        type: "ControlledAccessGrants",
        asserted: "1564814387",
        value: resource,
        source: "https://test-url/source_dac",
        by: "dac",
    }
    const user = await UserPermissions.updateOne(  { 'sub' : id },
                                { $setOnInsert: { "assertions" : assertion } },
                                { new: true, upsert: true, session })                                       

    let response = await UserPermissions.findOneAndUpdate(
                                    { 'sub' : id, 'assertions.value' : resource },
                                    { $set : { "assertions.$" : assertion } },
                                    { new: true, session });  
    
    if(!response) {
        await UserPermissions.findOneAndUpdate(
            { 'sub' : id }, 
            { $addToSet : { "assertions" : assertion } },
            { new: true, session });

        response = await UserPermissions.findOne({'sub': id, "assertions.value": resource}, null, { session })
    }

    return response
}

// 1.A.3. DENY REQUEST: CHANGE THE DATA REQUEST STATUS TO "DENIED"
const denyUserRequest = async (dacIds, objectId) => {
    let response = await Promise.all(dacIds.map(async id => {
        return await DacRequests.findOneAndUpdate(
            { 'dacId': id, 'requests._id': objectId },
            {  $set : { "requests.$.status" : "Denied" }},
            {  new: true })
    }))

    return response
}

// 1.B. GET REQUESTS BY DAC AND STATUS

// 1.B.1. QUERY BY DAC AND STATUS (AGGREGATION)
const queryByDACandStatus = (id, status) => {
    return [
        { $match: { 'dacId': { $in: id } } }, 
        { $unwind: "$requests" },
        { $match: { "requests.status" : status } },
        { $project: { 
            _id: '$requests._id',
            user: '$requests.user', 
            fileId: '$requests.fileId', 
            resource: '$requests.resource', 
            comment: '$requests.comment',
            status: '$requests.status' }
        }
    ]
}

// 1.B.2 GET PENDING USER REQUESTS BY DAC AND STATUS
const getPendingUserRequests = async (id) => await DacRequests.aggregate(queryByDACandStatus(id, "Pending"))
// 1.B.3 GET ACCEPTED USER REQUESTS BY DAC AND STATUS
const getAcceptedUserRequests = async (id) => await DacRequests.aggregate(queryByDACandStatus(id, "Accepted"))

// 1.C. GET USER REQUESTS ASSIGNED TO THIS DAC-MEMBER BY ID
const getUserDacs = async (id) => {
    const response = await DacData.find({ 'members': id })
                                  .select({ '_id': 0, 'members': 0, 'files': 0, 'info': 0 });
    return response
}

// 1.D. GET DAC DATA: DAC Data associated to a specific user.
const getDacData = async (id) => {
    const response = await DacData.find({ 'members': id })
                                  .select({ '_id': 0, 'members': 0 });
    return response
}

// 1.E. GET POLICIES 

// 1.E.1 GET ALL POLICIES BY DACS ARRAY (AGGREGATION)
const queryAllDacPolicies = (dacs) => {
    return [
        { $match: { 'dacId': { $in: dacs } } }, 
        { $unwind: "$files" },
        { $project: { 
            dacId: '$dacId',
            _id: '$files._id',
            fileId: '$files.fileId', 
            policy: '$files.policy', 
            acl: '$files.acl' }
        }
    ]
}

// 1.E.2 GET POLICIES BY DACS (ARRAY)
const getPolicies = async (dacs) => await DacData.aggregate(queryAllDacPolicies(dacs))

// 1.F. UPDATE POLICIES:
const updatePolicies = async (id, dac, file, policy) => {

    let resourceData = await DacData.find({ 'dacId': dac, 'files.fileId': file })
                                    .select({ '_id': 0, 'files.$': 1 });

    let { acl } = resourceData[0].files[0];

    let obj = { 'fileId': file,
                'policy': policy,
                'acl': acl }

    let response = await DacData.findOneAndUpdate({ 'dacId': dac, 'files.fileId': file },
                                                  { $set: { 'files.$': obj } });

    let dacs = (await getUserDacs(id)).map(({ dacId }) => dacId);

    response = await getPolicies(dacs);

    return response
}


// 1.G. UPDATE DAC INFO: 
const updateDacInfo = async (id, info) => {

    let { dacId,
          dacName,
          dacStudy,
          datasets,
          adminName,
          adminSurname,
          emailAddress,
          studyDescription } = info

    let obj = { 'dacName': dacName,
                'dacStudy': dacStudy,
                'datasets': datasets,
                'adminName': adminName,
                'adminSurname': adminSurname,
                'emailAddress': emailAddress,
                'studyDescription': studyDescription,
                'status': false }

    await DacData.findOneAndUpdate({ 'dacId': dacId },
                                   { 'info': obj },
                                   { new: true });

    let response = await getDacData(id);

    return response
}

export { 
    getAcceptedUserRequests,
    getPendingUserRequests, 
    getDacData, 
    getPolicies, 
    getUserDacs, 
    updatePolicies, 
    updateDacInfo, 
    acceptRequestTransaction,
    denyUserRequest }