import { validatePolicies } from '../models/dac-data';
import createError from 'http-errors';

export default async (req, res, next) => {   
    if(req.method === "PUT") {
		// Validate with Joi.
		const { error } = validatePolicies({ 	
			dacId : req.param('dac-id'),
			dsId : req.param('ds-id'),
			policy : req.param('policy')
		}) 
		if(error) throw createError(400, "Bad request")
    } 

	next();
}