import { Router } from 'express';
import jwt_decode from "jwt-decode";
import { getPolicies, postRequest, getRequestsStatus } from '../services/user';

export default ({ keycloak }) => {
	let api = Router();

	api.post('/request', keycloak.protect(), async function(req,res) {
		const userInfo = jwt_decode(req.headers.authorization)
		const response = await postRequest(userInfo.sub, req.param('ds-id'), req.param('comments'));
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

	/*
	api.post('/requestdac', keycloak.protect(), async function(req, res){
        const userInfo = jwt_decode(req.headers.authorization)
		// Request to become a DAC admin - HELPDESK PORTAL
        const response = "User " + userInfo.sub + ": Request for getting a DAC admin role - submitted"
        res.send(response)
	*/	
}
