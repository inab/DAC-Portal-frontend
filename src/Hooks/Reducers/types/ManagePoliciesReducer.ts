import { Policy } from '../../../Domain/Entities/Entities'
import { RequestParams } from '../../../Domain/Ports/Requests'

export declare type State = { 
    request: RequestParams,
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