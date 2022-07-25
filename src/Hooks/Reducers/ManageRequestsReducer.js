import { useCallback, useReducer } from 'react';

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
        case "put":
            const { object, index } = action.payload;
            return {
                ...state,
                type: 'put',
                url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests`,
                params: {
                    'format': "PLAIN",
                    'account-id': `${object.user}`,
                    'acl': `${object.resource}`
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
        putItem: (object, index) => {
            dispatch({ type: "put", payload: { object: object, index: index } })
        },
        deleteItem: (object, index) => {
            dispatch({ type: "delete", payload: { object: object, index: index } })
        }
    }))
    return [request, handlers]
}

export default useRequest