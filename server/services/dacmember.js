// IMPORT MONGOOSE MODELS.
import { DacRequests } from '../models/dac-requests';
import { DacData } from '../models/dac-data';

/* FUNCTIONS */

/* 1. MONGO DB: */

// 1.a. GET USER REQUESTS ASSIGNED TO THIS DAC-MEMBER BY ID -> EVENTUALLY, THIS QUERY WILL USE DAC-ID INSTEAD (WE DON'T HAVE DAC IDs YET) 

const getUserRequests = async (id) => {
    const response = await DacRequests.find({ 'dacId': id })
                                      .select({ 'requests': 1, 'dacId': 1, '_id': 0 });

    return response
}

// 1.a. GET USER REQUESTS ASSIGNED TO THIS DAC-MEMBER BY ID

const getUserDacs = async (id) => {
    const response = await DacData.find({ 'members': id })
                                  .select({ '_id': 0, 'members': 0, 'files': 0 });
    return response
}

// 1.b. GET DAC DATA: DAC Data associated to a specific user.

const getDacData = async (id) => {
    const response = await DacData.find({ 'members': id })
                                  .select({ '_id': 0, 'members': 0 });
    return response
}

// 1.c. Update policy: DAC Data.

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

// 1.d. GET POLICIES BY DAC-ID AND FILE-ID

const getPolicies = async (dac, file) => {
    const response = await DacData.find({ 'dacId': dac, 'files.fileId': file })
                                  .select({ '_id': 0, 'members': 0, 'files.$': 1 });

    return response
}

// 1.e. Update DAC info: 

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

exports.getUserRequests = getUserRequests;
exports.getDacData = getDacData;
exports.updatePolicies = updatePolicies;
exports.updateDacInfo = updateDacInfo;
exports.getPolicies = getPolicies;
exports.getUserDacs = getUserDacs;