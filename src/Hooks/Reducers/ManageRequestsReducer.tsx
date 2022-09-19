import { useReducer } from 'react';
import { State, Actions, Dispatchers } from './types/ManageRequestsReducer';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

const INITIAL_STATE : State = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests/pending`,
    params: {
        'format': undefined,
        'account-id': undefined
    },
    index: undefined
}

const requestsReducer = (state: State, action: Actions): any => {
    const { object, index } = action.payload;
    switch (action.type) {
        case "accept":
            return {
                ...state,
                type: 'put',
                url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests`,
                params: {
                    'format': "PLAIN",
                    'account-id': `${object.user}`,
                    'acl': `${object.resource}`,
                    'object-id': `${object._id}`
                },
                index: index
            }  
        case "delete":
            return INITIAL_STATE
        default:
            return state
    }
} 

const useRequest = () => {
    const [request, dispatch] = useReducer(requestsReducer, INITIAL_STATE)

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