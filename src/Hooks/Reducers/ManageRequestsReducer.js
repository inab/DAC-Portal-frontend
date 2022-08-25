import { useCallback, useReducer } from 'react';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

const INITIAL_STATE = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests/pending`,
    token: localStorage.getItem("react-token"),
    params: {
        'format': null,
        'account-id': null
    },
    data: null
}

const requestsReducer = (state, action) => {
    switch (action.type) {
        case "accept":
            const { object, index } = action.payload;
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
            // IMPLEMENTATION NEEDED
    }
} 

const useRequest = (object, index) => {
    const [request, dispatch] = useReducer(requestsReducer, INITIAL_STATE)

    const handlers = useCallback(({
        acceptRequest: (object, index) => {
            dispatch({ type: "accept", payload: { object: object, index: index } })
        },
        deleteRequest: (object, index) => {
            dispatch({ type: "delete", payload: { object: object, index: index } })
        }
    }))
    return [request, handlers]
}

export default useRequest