import { DataRequest } from '../../../Domain/Entities/Entities'
import { RequestParams } from '../../../Domain/Ports/Requests'

export declare type State = RequestParams;

export declare type Actions = 
    | { type: 'accept',
        payload: { object: DataRequest, index: number } 
      }
    | {
        type: 'delete',
        payload: { object: DataRequest, index: number }  
      }

export declare type Dispatchers = {
    acceptRequest : (object: DataRequest, index: number) => void
    deleteRequest : (object: DataRequest, index: number) => void
} 
