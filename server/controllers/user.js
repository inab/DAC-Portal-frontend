import jwt_decode from "jwt-decode";
import createError from 'http-errors';
import * as UserService from '../services/user';

const postRequest = async function (req, res) {
    const userInfo = jwt_decode(req.headers.authorization)

    const fileData = await UserService.getRequestedFileData(req.param('ds-id'))

    if (!fileData) throw createError(404, "Not found. No DAC controlling this resource.")

    const requestObject = UserService.buildRequestObject(
        userInfo.sub, 
        req.param('ds-id'), 
        fileData.resource, 
        req.param('comments')
    );

    const response = await UserService.setUserRequestData(fileData.dacId, requestObject)

    res.send(response)
};
const getPolicies = async function (req, res) {
    const response = await UserService.getPolicies(req.param('ds-id'));
    res.send(response)
}
const getRequestsStatus = async function (req, res) {
    const userInfo = jwt_decode(req.headers.authorization)
    const response = await UserService.getRequestsStatus(userInfo.sub);
    res.send(response)
}
export { postRequest, getPolicies, getRequestsStatus }
