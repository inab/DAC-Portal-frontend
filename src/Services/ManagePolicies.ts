import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Policy, PoliciesRequestParams } from '../../src/Models/ManagePolicies';

const policiesRequest = async (request : PoliciesRequestParams) => {
    const config: AxiosRequestConfig = {
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        },
        params: request.params
    }

    const response: AxiosResponse<Array<Policy>> = await axios(config)

    return response
} 

const getPolicies = async (request : PoliciesRequestParams) => {
    const { data } : AxiosResponse<Array<Policy>> = await policiesRequest(request);
    return data
}

const updatePolicies = async (request : PoliciesRequestParams) => {
    const { data } : AxiosResponse<Array<Policy>> = await policiesRequest(request);
    return data
}

export { getPolicies, updatePolicies }