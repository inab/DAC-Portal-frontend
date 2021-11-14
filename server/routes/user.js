import { Router } from 'express';
import jwt_decode from "jwt-decode";
import { getRequestsStatus } from '../services/user';

export default ({ config, db, keycloak }) => {
	let api = Router();
	api.get('/status', keycloak.protect(), async function(req, res){
		const userInfo = jwt_decode(req.headers.authorization)
		const response = await getRequestsStatus(userInfo.sub);
		res.send(response)
	})
	api.post('/requestdac', keycloak.protect(), async function(req, res){
        const userInfo = jwt_decode(req.headers.authorization)
		// Request to become a DAC admin - HELPDESK PORTAL
        const response = "User " + userInfo.sub + ": Request for getting a DAC admin role - submitted"
        res.send(response)
    })

	return api;
}
