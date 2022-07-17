// IMPORT MONGOOSE MODELS.
import mongoose from 'mongoose';
import { DacRequests } from '../models/DAC-Portal/dac-requests';
import { DacData } from '../models/DAC-Portal/dac-data';
import { UserPermissions } from '../models/Permissions-API/user';

/* 1. MONGO DB: */

// 1.A. ACCEPT REQUEST TRANSACTION: DAC-PORTAL-DB: STATUS -> ACCEPTED, PERMISSIONS-API: ADD DATA PERMISSIONS. 
const acceptRequestTransaction = async (adminDacs, userId, resource) => {
    const session = await mongoose.startSession();

    let isCompleted = false;

    try {
        session.startTransaction();
        const firstResponse = await Promise.all(adminDacs.map(async (item) => {
            return await acceptRequestStatus(item.dacId, userId, resource, session)
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
const acceptRequestStatus = async (id, userId, resource, session) => {
    let response = await DacRequests.findOneAndUpdate(
        { 'dacId': id, 'requests.user': userId, 'requests.requests.resource': resource },
        {  $set : { "requests.$[i].requests.$[j].status" : "Accepted" }},
        {  arrayFilters: [{ "i.user": userId }, { "j.resource": resource }], new: true, session }
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

// 1.B. GET USER REQUESTS ASSIGNED TO THIS DAC-MEMBER BY ID
const getUserRequests = async (id) => {
    const response = await DacRequests.find({ 'dacId': { $in: id } })
                                      .select({ 'requests': 1, 'dacId': 1, '_id': 0 });

    return response
}

// 1.C. GET USER REQUESTS ASSIGNED TO THIS DAC-MEMBER BY ID
const getUserDacs = async (id) => {
    const response = await DacData.find({ 'members': id })
                                  .select({ '_id': 0, 'members': 0, 'files': 0 });
    return response
}

// 1.D. GET DAC DATA: DAC Data associated to a specific user.
const getDacData = async (id) => {
    const response = await DacData.find({ 'members': id })
                                  .select({ '_id': 0, 'members': 0 });
    return response
}

// 1.E. UPDATE POLICIES: DAC Data.
const updatePolicies = async (id, dac, file, policy) => {

    let resourceData = await DacData.find({ 'dacId': dac, 'files.fileId': file })
                                    .select({ '_id': 0, 'files.$': 1 });

    let { acl } = resourceData[0].files[0];

    let obj = { 'fileId': file,
                'policy': policy,
                'acl': acl }

    let response = await DacData.findOneAndUpdate({ 'dacId': dac, 'files.fileId': file },
                                                  { $set: { 'files.$': obj } });

    response = await getDacData(id);

    return response
}

// 1.F. GET POLICIES BY DAC-ID AND FILE-ID
const getPolicies = async (dac, file) => {
    const response = await DacData.find({ 'dacId': dac, 'files.fileId': file })
                                  .select({ '_id': 0, 'members': 0, 'files.$': 1 });

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
    getUserRequests, 
    getDacData, 
    getPolicies, 
    getUserDacs, 
    updatePolicies, 
    updateDacInfo, 
    acceptRequestTransaction }