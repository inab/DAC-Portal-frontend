import { useReducer } from 'react';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

const INITIAL_STATE = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/user/status`,
    token: localStorage.getItem("react-token")
}

const requestsReducer = (state, action) => {
    switch (action.type) {
        case "get":
            return INITIAL_STATE
    }
}

const useRequest = () => {
    return useReducer(requestsReducer, INITIAL_STATE)
}

export default useRequest