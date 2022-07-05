import { Router } from 'express';
import jwt_decode from "jwt-decode";
import { getPolicies, postRequest, getRequestsStatus, getRequestedFileData, buildRequestObject } from '../services/user';
import createError from 'http-errors';

export default ({ keycloak }) => {
	let api = Router();

	api.post('/request', keycloak.protect(), async function(req,res) {
		const userInfo = jwt_decode(req.headers.authorization)
		
		const fileData = await getRequestedFileData(req.param('ds-id'))

		if(!fileData) throw createError(404, "Not found. No DAC controlling this resource.")

		const requestObject = buildRequestObject(req.param('ds-id'), fileData.resource, req.param('comments'), "Pending");

		const response = await postRequest(userInfo.sub, fileData.dacId, requestObject);

		res.send(response)
	})
	api.get('/policies', keycloak.protect(), async function(req,res) {
		const response = await getPolicies(req.param('ds-id'));
		res.send(response)
	})
	// Just for giving an example: Status addition has still to be decided (and where should be displayed (i.e Catalogue portal))
	api.get('/status', keycloak.protect(), async function(req, res){
		const userInfo = jwt_decode(req.headers.authorization)
		const response = await getRequestsStatus(userInfo.sub);
		res.send(response)
	})

	return api;
}
