import { useCallback, useReducer } from 'react';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

const INITIAL_STATE = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/policies`,
    token: localStorage.getItem("react-token"),
    params: null
}

const policiesReducer = (state, action) => {
    switch (action.type) {
        case "get":
            return INITIAL_STATE
        case "put": 
            const { object } = action.payload;
            return {
                ...state,
                type: 'put',
                url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/policies`,
                params: { 
                    'dac-id' : `${object.dacId}`,
                    'ds-id' : `${object.fileId}`,
                    'acl' : `${object.acl}`,
                    'policy': `${object.policy}`
                }
            }
    }
}

const useRequest = (object) => {
    const [request, dispatch] = useReducer(policiesReducer, INITIAL_STATE)

    const handlers = useCallback(({
        putItem: (object) => {
            dispatch({ type: "put", payload: { object: object } })
        }
    }))
    return [request, handlers]
}

export default useRequest