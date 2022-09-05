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
    token: string | null,
    params?: {
        'format'?: string,
        'account-id'?: string,
        'acl'?: string,
        'object-id'?: string,
        'values'?: string
    },
    index?: number | undefined
}

export declare type State = { 
    request: PoliciesRequestParams,
    input: {
        index?: number,
        value?: string
    }
}

export declare type Actions = 
    |
     {
        type: 'save',
        payload: { object: Policy }
     }
    |
     {
        type: 'change',
        payload: { evt: React.ChangeEvent<HTMLInputElement> }
     }

type SaveDispatcher = {
    savePolicy: (object: Policy) => void
}

type ChangeDispatcher = {
    changePolicy: (e: React.ChangeEvent<HTMLInputElement>) => void
} 

export type Dispatchers = SaveDispatcher | ChangeDispatcher