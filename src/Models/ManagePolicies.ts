import { Method } from 'axios';

export declare type Policy = {
    _id: string,
    dacId: string,
    fileId: string,
    acl: string,
    policy: string
};

export interface PoliciesRequestParams {
    type: Method,
    url: string,
    token: string,
    params: {
        'format'?: string,
        'account-id'?: string,
        'acl'?: string,
        'object-id'?: string
    },
    index?: number
}

export declare type Assertion = {
    sub?: string,
    type: string,
    value: string,
    source: string,
    by: string,
    asserted: number
};

export declare type Visa = {
    exp: number
    format: string
    ga4gh_visa_v1: Assertion
    iat: number
    iss: string
    sub: string
};