import { useReducer } from 'react';
import { Dispatchers } from '../Reducers/types/ManageRequestsReducer';
import reducers from '../Reducers/ManageRequests';

const useRequest = () => {
    const [request, dispatch] = useReducer(reducers.requests, reducers.initialState)

    const handlers : Dispatchers = {
        acceptRequest: (object, index) => {
            dispatch({ type: "accept", payload: { object: object, index: index } })
        },
        deleteRequest: (object, index) => {
            dispatch({ type: "delete", payload: { object: object, index: index } })
        }
    }
    
    return [request, handlers]
}

export { useRequest }