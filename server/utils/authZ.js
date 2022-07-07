const getAuthZ = (userInfo) => {
    if(!userInfo["dac:roles"] && !userInfo["dac:members"]){
        return null;
    } else {
        const roles = userInfo["dac:roles"].filter(n => n)[0];
        const resources = [].concat.apply([], userInfo["dac:members"].filter(el => el !== null));
        return { "roles": roles, "resources": resources }
    }
}
const checkRole = (roles, query) => {
    return roles.map(el => el.includes(query)).includes(true)
}
const checkResource = (dacResources, resource) => {
    return dacResources.map(el => el.includes(resource)).includes(true)
}

export { getAuthZ, checkRole, checkResource }