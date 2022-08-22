import axios from 'axios';

const policiesRequest = async (request) => {
    return await axios({
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        },
        params: request.params
    })  
} 

const getPolicies = async (request) => {
    const { data } = await policiesRequest(request);
    return data
}

const updatePolicies = async (request) => {
    const { data } = await policiesRequest(request);
    return data
}

export { getPolicies, updatePolicies }