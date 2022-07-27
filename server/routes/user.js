import { Router } from 'express';
import * as UserController from '../controllers/user';

export default ({ keycloak }) => {
	let api = Router();

	api.post('/request', keycloak.protect(), UserController.postRequest)
	api.get('/policies', keycloak.protect(), UserController.getPolicies)
	api.get('/status', keycloak.protect(), UserController.getRequestsStatus)

	return api;
}
