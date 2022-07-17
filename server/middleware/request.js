import { validatePolicies } from '../models/DAC-Portal/dac-data';
import createError from 'http-errors';

export default async (req, res, next) => {  
    if(req.method === "PUT" & req.path === "/policies") {
		// Validate with Joi.
		const { error } = validatePolicies({ 	
			dacId : req.param('dac-id'),
			dsId : req.param('ds-id'),
			policy : req.param('policy')
		}) 
		if(error) throw createError(400, "Bad request")
	}
	if(req.method === "PUT" & req.path === "/info") {
		// Validate with Joi.
		/*const { error } = validateDacInfo({ 	
			
		}) 
		if(error) throw createError(400, "Bad request")*/
	}
	next();
}