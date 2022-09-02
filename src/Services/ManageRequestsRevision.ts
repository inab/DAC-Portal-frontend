import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { UserRequest, UserRequestParams } from '../Models/RequestsRevision';

const getUserRequests = async (request: UserRequestParams) => {
    const config: AxiosRequestConfig = {
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        }
    }   

    const { data } : AxiosResponse<Array<UserRequest>> = await axios(config)

    return data
}

export { getUserRequests } 