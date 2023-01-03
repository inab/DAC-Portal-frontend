import { DACInfo } from '../Entities/Entities';

export interface RequestParams {
    type: string,
    url: string,
    params: {
        id?: string,
        format?: string,
        accountId?: string,
        acl?: string,
        objectId?: string,
        values?: string,
        dacId?: string,
        fileId?: string,
        value?: string,
        status?: string,
    },
    index?: number
}

export interface DACRequestParams {
    type: string,
    url: string,
    params: DACInfo
}