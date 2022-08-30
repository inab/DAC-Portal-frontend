import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { UserRequest, UserRequestParams } from '../../src/Models/ManageRequests';

const getUserRequests = async (request: UserRequestParams) => {
    const config: AxiosRequestConfig = { 
            method: request.type,
            url: request.url,
            headers: {
                Authorization: "Bearer " + request.token
            },
            params: request.params
    }

    const response: AxiosResponse<Array<UserRequest>> | [] = await axios(config)

    return response
}   

const getPendingUserRequests = async (request: UserRequestParams) => {
    const { data } : AxiosResponse<Array<UserRequest>> = await getUserRequests(request)
    return data
}  

const updateUsersRequests = async (request: UserRequestParams, items: Array<UserRequest>) => {
    const config: AxiosRequestConfig = { 
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        },
        params: request.params
    }    
    
    await axios(config)

    const response: Array<UserRequest> | [] = items.filter((element, index) => index !== request.index);

    return response
}

export { getPendingUserRequests, updateUsersRequests }