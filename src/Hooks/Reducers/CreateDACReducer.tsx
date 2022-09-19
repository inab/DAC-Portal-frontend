import { useReducer } from 'react';
import { State, Actions, Dispatchers } from './types/CreateDACReducer';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

const INITIAL_STATE_REQUEST: State["request"] = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/data`,
    params: {
        dacId: undefined,
        dacName: undefined,
        dacStudy: undefined,
        datasets: undefined,
        adminName: undefined,
        adminSurname: undefined,
        emailAddress: undefined,
        studyDescription: undefined
    }
}

const INITIAL_STATE_INPUT: State["input"] = {
    index: undefined,
    value: undefined
}

const dacsRequestsReducer = (state: State, action: Actions): any => {
    switch (action.type) {
        case "update": {
            const { object } = action.payload;
            return {
                ...state,
                type: 'put',
                url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/info`,
                params: {
                    dacId: object.dacId,
                    dacName: object.dacName,
                    dacStudy: object.dacStudy,
                    datasets: object.datasets,
                    adminName: object.adminName,
                    adminSurname: object.adminSurname,
                    emailAddress: object.emailAddress,
                    studyDescription: object.studyDescription
                }
            }
        }
        default:
            return state
    }
}

const dacsInputReducer = (state: State, action: Actions): any => {
    switch (action.type) {
        case "change": {
            const { evt, index } = action.payload;
            return {
                ...state,
                index: index,
                name: evt.target.getAttribute('name'),
                value: evt.target.value
            }
        }
        default:
            return INITIAL_STATE_INPUT
    }
}

const useRequest = () => {
    const [request, dispatch] = useReducer(dacsRequestsReducer, INITIAL_STATE_REQUEST)

    const handlers: Dispatchers = {
        updateDAC: (object) => {
            dispatch({ type: "update", payload: { object: object } })
        }
    }
    return [request, handlers]
}

const useInput = () => {
    const [input, dispatch] = useReducer(dacsInputReducer, INITIAL_STATE_INPUT)

    const handlers: Dispatchers = {
        changeInput: (evt, index) => dispatch({ type: "change", payload: { evt: evt, index } })
    }
    return [input, handlers]
}

export { useRequest, useInput }