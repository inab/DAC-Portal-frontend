import { Router } from 'express';
import jwt_decode from "jwt-decode";
import { getPolicies, postRequest, getRequestsStatus } from '../services/user';

export default ({ keycloak }) => {
	let api = Router();

	api.post('/request', keycloak.protect(), async function(req,res) {
		const userInfo = jwt_decode(req.headers.authorization)
		const fileId = req.param('ds-id');
		const comments = req.param('comments');
		const response = await postRequest(userInfo.sub, fileId, comments);
		res.send(response)
	})
	api.get('/policies', keycloak.protect(), async function(req,res) {
		const fileId = req.param('ds-id');
		const response = await getPolicies(fileId);
		res.send(response)
	})
	// Just for giving an example: Status addition has still to be decided (and where should be displayed (i.e Catalogue portal))
	api.get('/status', keycloak.protect(), async function(req, res){
		const userInfo = jwt_decode(req.headers.authorization)
		const response = await getRequestsStatus(userInfo.sub);
		res.send(response)
	})

	return api;

	/*
	api.post('/requestdac', keycloak.protect(), async function(req, res){
        const userInfo = jwt_decode(req.headers.authorization)
		// Request to become a DAC admin - HELPDESK PORTAL
        const response = "User " + userInfo.sub + ": Request for getting a DAC admin role - submitted"
        res.send(response)
	*/	
}
