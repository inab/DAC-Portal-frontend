import { Method } from 'axios';

export declare type UserRequest = {
    _id: string,
    user: string,
    fileId: string,
    resource: string,
    comment: string,
    status: string
};

export interface UserRequestParams {
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