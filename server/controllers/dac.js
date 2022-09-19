import jwt_decode from "jwt-decode";
import * as DacService from '../services/dac';

const getData = async (req, res) => {
    const userInfo = jwt_decode(req.headers.authorization)
    const response = await DacService.getDacData(userInfo.sub);
    res.send(response)
};
const getDacPolicies = async (req, res) => {
    const userInfo = jwt_decode(req.headers.authorization)
    const dacs = (await DacService.getUserDacs(userInfo.sub)).map(({ dacId }) => dacId);
    const response = await DacService.getPolicies(dacs);
    res.send(response)
};
const getPendingRequests = async (req, res) => {
    const userInfo = jwt_decode(req.headers.authorization)
    const dacs = (await DacService.getUserDacs(userInfo.sub)).map(({ dacId }) => dacId);
    const response = (await DacService.getPendingUserRequests(dacs));
    res.send(response)
}
const getAcceptedRequests = async (req, res) => {
    const userInfo = jwt_decode(req.headers.authorization)
    const dacs = (await DacService.getUserDacs(userInfo.sub)).map(({ dacId }) => dacId);
    const response = (await DacService.getAcceptedUserRequests(dacs));
    res.send(response)
}
const grantRequests = async (req, res) => {
    const userInfo = jwt_decode(req.headers.authorization);
    const userDacs = await DacService.getUserDacs(userInfo.sub);
    
    const transaction = await DacService.acceptRequestTransaction(
        userDacs, 
        req.param("object-id"),
        req.param("account-id"), 
        req.param("acl")
    )

    transaction.response 
        ? res.send({ response: transaction.response })
        : res.send({ response: "Request could not be processed" })
}
const denyRequests = async (req, res) => {
    const userInfo = jwt_decode(req.headers.authorization);
    const userDacs = (await DacService.getUserDacs(userInfo.sub)).map(({ dacId }) => dacId);
    const response = (await DacService.denyUserRequest(userDacs, req.param("object-id")));
    res.send(response)
}
const updateDacPolicies = async (req, res) => {
    const userInfo = jwt_decode(req.headers.authorization)
    const response = await DacService.updatePolicies(userInfo.sub, req.param('dac-id'), req.param('ds-id'), req.param('policy'));
    res.send(response)
}
const updateInfo = async (req, res) => {
    const userInfo = jwt_decode(req.headers.authorization);
    const response = await DacService.updateDacInfo(userInfo.sub, req.body);
    res.send(response)
}

export { getData, getPendingRequests, getAcceptedRequests, grantRequests, denyRequests, getDacPolicies, updateDacPolicies, updateInfo }
