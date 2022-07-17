import { useReducer } from 'react';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

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
        case "put":
            const { object, index } = action.payload;
            return {
                ...state,
                type: 'put', 
                url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests`, 
                params: {
                    'format' : "PLAIN",
                    'account-id' : `${object.user}`,
                    'acl': `${object.resource}`
                }, 
                index: index
            }
    }
}

const useRequest = () => {
    return useReducer(requestsReducer, INITIAL_STATE)
}

export default useRequest