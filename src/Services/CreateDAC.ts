import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { DACRequestParams } from '../Models/CreateDACReducer';

const useDACsRequest = async (request: DACRequestParams) => {
    const config: AxiosRequestConfig = {
        method: request.type,
        url: request.url,
        headers: {
            Authorization: "Bearer " + request.token
        },
        params: request.params
    }

    const response : AxiosResponse<any> = await axios(config)

    return response
}

const getUserDACs = async (request: DACRequestParams) => {
    const { data } : AxiosResponse<Array<any>> = await useDACsRequest(request);

    return data.length > 0 ? parseUserDacs(data) : []
}

const updateDACInfo = async (request: DACRequestParams) => {
    const { data } : AxiosResponse<Array<any>> = await useDACsRequest(request)

    return data.length > 0 ? parseUserDacs(data) : []
}

const parseUserDacs = (dacs: Array<any>) => {
    let parsed = dacs.map((item: any) => {
        const { dacId, info } = item
        return Object.assign({}, { dacId: dacId, ...info })
    })
    return parsed
}

export { getUserDACs, updateDACInfo }
