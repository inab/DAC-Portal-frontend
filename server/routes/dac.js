import { Router } from 'express';
import resource from '../middleware/authZ';
import request from '../middleware/request';
import * as DacController from '../controllers/dac';

export default ({ keycloak }) => {
	let api = Router();

	api.get('/data', [keycloak.protect(), request, resource], DacController.getData)
	api.get('/requests/accepted', [keycloak.protect(), request, resource], DacController.getAcceptedRequests)
	api.get('/requests/pending', [keycloak.protect(), request, resource], DacController.getPendingRequests)
	api.put('/requests', [keycloak.protect(), request, resource], DacController.updateRequests)
	api.delete('/requests', [keycloak.protect(), request, resource], DacController.revokeRequests)
	api.get('/policies', [keycloak.protect(), request, resource], DacController.getDacPolicies)
	api.put('/policies', [keycloak.protect(), request, resource], DacController.updateDacPolicies)
	api.put('/info', [keycloak.protect(), request, resource], DacController.updateInfo)

	return api;
}
