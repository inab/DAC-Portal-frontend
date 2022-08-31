import { Method } from 'axios';

export declare type Permission = {
    sub: string,
    type: string,
    value: string,
    source: string,
    by: string,
    asserted: number
};

export interface PermissionsRequestParams {
    type: Method,
    url: string,
    token: string | null,
    params: {
        'format'?: string,
        'account-id'?: string,
        'acl'?: string,
        'object-id'?: string,
        'values'?: string
    },
    index?: number | undefined
}

export declare type State = PermissionsRequestParams;

export declare type Actions = {
    type: 'delete',
    payload: { object: Permission, index: number }
}

export declare type Dispatchers = {
    deleteItem : (object: Permission, index: number) => void
} 
