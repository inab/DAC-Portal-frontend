import { useCallback, useReducer } from 'react';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

const INITIAL_STATE_REQUESTS = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/policies`,
    token: localStorage.getItem("react-token"),
    params: null,
    index: null,
    value: null
}

const INITIAL_STATE_INPUT = {
    index: null,
    value: null
}

const policiesRequestReducer = (state, action) => {
    switch (action.type) {
        case "get":
            return INITIAL_STATE
        case "put": {
            const { object } = action.payload;
            return {
                ...state,
                type: 'put',
                url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/policies`,
                params: {
                    'dac-id': `${object.dacId}`,
                    'ds-id': `${object.fileId}`,
                    'acl': `${object.acl}`,
                    'policy': `${object.policy}`
                }
            }
        }      
    }
}

const policiesInputReducer = (state, action) => {
    switch (action.type) {
        case "change": {
            const { evt } = action.payload;
            return {
                ...state,
                index: evt.target.getAttribute('data-id'),
                value: evt.target.value
            }
        }        
    }
}

const useRequest = (object) => {
    const [request, dispatch] = useReducer(policiesRequestReducer, INITIAL_STATE_REQUESTS)

    console.log("state: request")
    console.log(request)
    
    const handlers = useCallback(({
        putItem: (object) => {
            dispatch({ type: "put", payload: { object: object } })
        }
    }))
    return [request, handlers]
}

const useInput = (evt) => {
    const [input, dispatch] = useReducer(policiesInputReducer, INITIAL_STATE_INPUT)

    console.log("state: input")
    console.log(input)

    const handlers = useCallback(({
        changeItem: (evt) => {
            dispatch({ type: "change", payload: { evt: evt } })
        }
    }))
    return [input, handlers]
}

export { useRequest, useInput }