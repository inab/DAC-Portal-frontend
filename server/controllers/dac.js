import jwt_decode from "jwt-decode";
import * as DacService from '../services/dacmember';

const getData = async (req, res) => {
    const userInfo = jwt_decode(req.headers.authorization)
    const response = await DacService.getDacData(userInfo.sub);
    res.send(response)
};
const getRequests = async (req, res) => {
    const userInfo = jwt_decode(req.headers.authorization)
    const dacs = (await DacService.getUserDacs(userInfo.sub)).map(({ dacId }) => dacId);
    const response = (await DacService.getUserRequests(dacs)).flatMap(({ requests }) => requests);
    res.send(response)
}
const updateRequests = async (req, res) => {
    const userInfo = jwt_decode(req.headers.authorization);
    const userDacs = await DacService.getUserDacs(userInfo.sub);
    const transaction = await DacService.acceptRequestTransaction(userDacs, req.param("account-id"), req.param("acl"))

    transaction.response ? res.send({ response: transaction.response })
        : res.send({ response: "Request could not be processed" })
}
const updateDacPolicies = async (req, res) => {
    const userInfo = jwt_decode(req.headers.authorization)
    // const acl = req.param('acl');
    const response = await DacService.updatePolicies(userInfo.sub, req.param('dac-id'), req.param('ds-id'), req.param('policy'));
    res.send(response)
}
const updateInfo = async (req, res) => {
    const userInfo = jwt_decode(req.headers.authorization);
    const response = await DacService.updateDacInfo(userInfo.sub, req.query);
    res.send(response)
}

export { getData, getRequests, updateRequests, updateDacPolicies, updateInfo }
