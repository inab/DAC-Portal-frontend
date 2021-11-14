import { Router } from 'express';
import jwt_decode from "jwt-decode";
import { getUserRequests } from '../services/dacmember';

export default ({ config, db, keycloak }) => {
	let api = Router();
	api.get('/invitation', keycloak.protect(), async function(req, res){
		const userInfo = jwt_decode(req.headers.authorization)
		const response = "USER/DAC " + userInfo.sub + ": " + "Invitations received to become member of a specific DAC" 
		res.send(response)
        })
        api.post('/invitation', keycloak.protect('dac-admin'), async function(req, res){
                const userInfo = jwt_decode(req.headers.authorization)
                const response = "DAC admin  " + userInfo.sub + ": " + "Invitations sent to other users to become member of a specific DAC" 
                res.send(response)
        })
        api.post('/register', keycloak.protect('dac-admin'), async function(req,res) {
                const userInfo = jwt_decode(req.headers.authorization)
		// POST a request for registering a new DAC -> HELPDESK PORTAL SHOULD VALIDATE THIS REQUEST.
                const response = "DAC admin " + userInfo.sub + ": " + "DAC Registration -> Submitted"
		res.send(response)
        })
        api.put('/update', keycloak.protect('dac-admin'), async function(req,res) {
                const userInfo = jwt_decode(req.headers.authorization)
                // Params: DAC ID
                // Update collection in the DAC Portal DB, that holds information about this specific DAC.
                const response = "DAC admin " + userInfo.sub + ": " +  "DAC_ID Updated"
		res.send(response)
        })
        api.post('/revoke', keycloak.protect('dac-admin'), async function(req,res) {
                const userInfo = jwt_decode(req.headers.authorization)
                // get requester (user) id
                // DELETE PERMISSIONS - PERMISSIONS-API
                // Change the request status info from granted to denied in the DAC Portal DB, to keep track of the requester granted datasets.
                const response = "DAC admin " + userInfo.sub + ": " + "DATASET DS_ID: Revoked"
		res.send(response)
        })
        api.get('/read', keycloak.protect('dac-member'), async function(req,res) {
                const userInfo = jwt_decode(req.headers.authorization)
                const response = await getUserRequests(userInfo.sub);
		res.send(response)
        })
	api.post('/grant', keycloak.protect('dac-member'), async function(req,res) {
                const userInfo = jwt_decode(req.headers.authorization)
		// get request id - and requester (user) id
		// change status to granted
		// POST PERMISSIONS - PERMISSIONS-API
		// Store the request status info in the DAC Portal DB, to keep track of the requester granted datasets
                const response = "DAC  " + userInfo.sub + ": " + "DATASET DS_ID: Granted"
		res.send(response)
	})
        api.post('/deny', keycloak.protect('dac-member'), async function(req,res) {
                const userInfo = jwt_decode(req.headers.authorization)
                // get request id - and requester (user) id
                // change status of the request to denied
                // Store the request status info in the DAC Portal DB, to keep track of the requester granted datasets
                const response = "DAC  " + userInfo.sub + ": " + "DATASET DS_ID: Denied"
		res.send(response)
        })



	return api;
}
