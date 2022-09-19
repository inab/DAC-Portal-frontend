import jwt_decode from "jwt-decode";
import { getAuthZ, checkRole, checkResource } from '../utils/authZ';
import createError from 'http-errors';

export default async (req, res, next) => {
	// A. RBAC: Check if the user has a DAC-role.
	// Decode JWT (dacInfo)
	const dacInfo = jwt_decode(req.headers.authorization);
	// Get DAC scopes.
	const dacScopes = getAuthZ(dacInfo);
	// User that does not belong to any DAC.
	if(!dacScopes) throw createError(403, "Forbidden");
	// Check if user has the dac-admin role (delete).
	const isDacAdmin = checkRole(dacScopes.roles, "dac-admin");
	// B. ABAC: Check if the DAC has access to the resources.
	let isControlledResource;

    if(req.method === "PUT" && !isDacAdmin) {
        if(!dacScopes) throw createError(403, "Forbidden");
    }

	if(req.method === "PUT" && isDacAdmin && (req.path !== "/info" || req.path !== "/requests/deny")) {
		isControlledResource = checkResource(dacScopes.resources, req.param('acl'));
		if(!isControlledResource) throw createError(403, "Forbidden");
	}

	next();
}