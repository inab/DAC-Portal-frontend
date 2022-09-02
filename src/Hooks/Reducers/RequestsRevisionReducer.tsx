import { useReducer } from 'react';
import { State, Actions } from '../../Models/RequestsRevisionReducer';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

const INITIAL_STATE = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/user/status`,
    token: localStorage.getItem("react-token")
}

const requestsReducer = (state: State, action: Actions): any => {
    switch (action.type) {
        case "get":
            return state
    }
}

const useRequest = () => {
    const [request, dispatch] = useReducer(requestsReducer, INITIAL_STATE)
    
    return [request, dispatch]
} 

export { useRequest }