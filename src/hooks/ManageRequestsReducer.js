import { useReducer } from 'react';

const { REACT_APP_DAC_PORTAL_API_URL, REACT_APP_PERMISSIONS_URL } = process.env

const INITIAL_STATE = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests`,
    token: localStorage.getItem("react-token"),
    params: {
        'format': null,
        'account-id': null
    },
    data: null
}

const requestsReducer = (state, action) => {
    switch (action.type) {
        case "get":
            return INITIAL_STATE
        case "post":
            const { assertions, user, index } = action.payload;
            return {
                ...state,
                type: 'post', 
                url: `${REACT_APP_PERMISSIONS_URL}/permissions`, 
                data: assertions,
                params: {
                    'format' : "PLAIN",
                    'account-id' : `${user}`
                }, 
                index: index
            }
    }
}

const useRequest = () => {
    return useReducer(requestsReducer, INITIAL_STATE)
}

export default useRequest