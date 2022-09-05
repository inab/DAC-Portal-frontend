import { useReducer } from 'react';
import { State, Actions, Dispatchers } from '../../Models/ManagePoliciesReducer';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

const INITIAL_STATE_REQUEST : State["request"] = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/policies`,
    token: localStorage.getItem("react-token"),
    params: undefined
}

const INITIAL_STATE_INPUT : State["input"] = {
    index: undefined,
    value: undefined
}

const policiesRequestReducer = (state: State, action: Actions) : any => {
    switch (action.type) {
        case "save": {
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
        default:
            return INITIAL_STATE_REQUEST   
    }
}

const policiesInputReducer = (state: State, action: Actions) : any => {
    switch (action.type) {
        case "change": {
            const { evt } = action.payload;
            return {
                ...state,
                index: evt.target.getAttribute('data-id'),
                value: evt.target.value
            }
        }
        default:
            return INITIAL_STATE_INPUT       
    }
}

const useRequest = () => {
    const [request, dispatch] = useReducer(policiesRequestReducer, INITIAL_STATE_REQUEST)

    const handlers : Dispatchers = {
        savePolicy: (object) => dispatch({ type: "save", payload: { object: object } })
    }
    return [request, handlers]
}

const useInput = () => {
    const [input, dispatch] = useReducer(policiesInputReducer, INITIAL_STATE_INPUT)

    const handlers : Dispatchers = {
        changePolicy: (evt) => dispatch({ type: "change", payload: { evt: evt } })
    }
    return [input, handlers]
}

export { useRequest, useInput }