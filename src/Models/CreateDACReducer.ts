import { Method } from 'axios';

export declare type DACInfo = {
    dacId?: string,
    dacName?: string,
    dacStudy?: string,
    datasets?: string,
    adminName?: string,
    adminSurname?: string,
    emailAddress?: string,
    studyDescription?: string,
    status?: boolean
};

export interface DACRequestParams {
    type: Method,
    url: string,
    token: string | null,
    params: DACInfo
}

export declare type State = { 
    request: DACRequestParams,
    input: {
        index?: number,
        value?: string
    }
}

export declare type Actions = 
    |
     {
        type: 'update',
        payload: { object: DACInfo }
     }
    |
     {
        type: 'change',
        payload: { evt: React.ChangeEvent<HTMLInputElement>, index: number }
     }

type UpdateDispatcher = {
    updateDAC: (object: DACInfo ) => void
}

type ChangeDispatcher = {
    changeInput: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void
} 

export type Dispatchers = UpdateDispatcher | ChangeDispatcher