import { Assertion } from '../../../Domain/Entities/Entities'
import { RequestParams } from '../../../Domain/Ports/Requests'

export declare type State = RequestParams;

export declare type Actions = {
    type: 'delete',
    payload: { object: Assertion, index: number }
}

export declare type Dispatchers = {
    deleteItem : (object: Assertion, index: number) => void
} 
