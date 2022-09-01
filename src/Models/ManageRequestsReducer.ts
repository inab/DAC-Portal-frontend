import { Method } from 'axios';

export declare type Request = {
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

export declare type State = UserRequestParams;

export declare type Actions = 
    | { type: 'accept',
        payload: { object: Request, index: number } 
      }
    | {
        type: 'delete',
        payload: { object: Request, index: number }  
      }

export declare type Dispatchers = {
    acceptRequest : (object: Request, index: number) => void
    deleteRequest : (object: Request, index: number) => void
} 
