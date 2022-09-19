import { DACInfo } from '../../../Domain/Entities/Entities'
import { DACRequestParams } from '../../../Domain/Ports/Requests'

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