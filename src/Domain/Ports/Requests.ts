import { DACInfo } from '../Entities/Entities';

export interface RequestParams {
    type: string,
    url: string,
    params: {
        'format'?: string,
        'account-id'?: string,
        'acl'?: string,
        'object-id'?: string,
        'values'?: string,
        'dac-id'?: string,
        'ds-id'?: string,
        'policy'?: string
    },
    index?: number
}

export interface DACRequestParams {
    type: string,
    url: string,
    params: DACInfo
}