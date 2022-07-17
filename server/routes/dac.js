import { Router } from 'express';
import jwt_decode from "jwt-decode";
import resource from '../middleware/authZ';
import request from '../middleware/request';
import {
	getUserRequests,
	getDacData,
	updatePolicies,
	updateDacInfo,
	getUserDacs,
	acceptRequestTransaction
} from '../services/dacmember';

export default ({ keycloak }) => {
	let api = Router();

	api.get('/data', [keycloak.protect(), request, resource], async function (req, res) {
		const userInfo = jwt_decode(req.headers.authorization)
		const response = await getDacData(userInfo.sub);
		res.send(response)
	})
	api.get('/requests', [keycloak.protect(), request, resource], async function (req, res) {
		const userInfo = jwt_decode(req.headers.authorization)
		const dacs = (await getUserDacs(userInfo.sub)).map(({ dacId }) => dacId);
		const response = (await getUserRequests(dacs)).flatMap(({ requests }) => requests);
		res.send(response)
	})
	api.put('/requests', [keycloak.protect(), request, resource], async function (req, res) {
		const userInfo = jwt_decode(req.headers.authorization);
		const userDacs = await getUserDacs(userInfo.sub);
		const transaction = await acceptRequestTransaction(userDacs, req.param("account-id"), req.param("acl"))

		transaction.response ? res.send({ response: transaction.response })
							 : res.send({ response: "Request could not be processed" })
	})
	api.put('/policies', [keycloak.protect(), request, resource], async function (req, res) {
		const userInfo = jwt_decode(req.headers.authorization)
		// const acl = req.param('acl');
		const response = await updatePolicies(userInfo.sub, req.param('dac-id'), req.param('ds-id'), req.param('policy'));
		res.send(response)
	})
	api.put('/info', [keycloak.protect(), request, resource], async function (req, res) {
		const userInfo = jwt_decode(req.headers.authorization);
		const response = await updateDacInfo(userInfo.sub, req.query);
		res.send(response)
	})

	return api;
}
