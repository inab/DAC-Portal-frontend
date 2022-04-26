import { Router } from 'express';
import jwt_decode from "jwt-decode";
import { getUserRequests, getDacData, updatePolicies, updateDacInfo, getUserDacs } from '../services/dacmember';
import resource from '../middleware/authZ';
import request from '../middleware/request';

export default ({ keycloak }) => {
	let api = Router();

        api.get('/data', [keycloak.protect(), request, resource], async function(req, res){
		const userInfo = jwt_decode(req.headers.authorization)
                const response = await getDacData(userInfo.sub);
		res.send(response)
        })
        api.get('/requests', [keycloak.protect(), request, resource], async function(req,res) {
                const userInfo = jwt_decode(req.headers.authorization)
                const userDacs = await getUserDacs(userInfo.sub);
                const response = await Promise.all(
		    userDacs.map(async (item) => await getUserRequests(item.dacId))
		)               
		res.send([].concat(...response))
        })
        api.put('/policies', [keycloak.protect(), request, resource], async function(req,res) {
                const userInfo = jwt_decode(req.headers.authorization)
                // const acl = req.param('acl');
                const response = await updatePolicies(userInfo.sub, req.param('dac-id'), req.param('ds-id'), req.param('policy'));
		res.send(response)
        })
        api.put('/info', [keycloak.protect(), request, resource], async function(req,res) {
                const userInfo = jwt_decode(req.headers.authorization);
                const response = await updateDacInfo(userInfo.sub, req.query);
		res.send(response)
        })

        return api;
}
