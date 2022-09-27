import { useReducer } from 'react';
import { Dispatchers } from '../../../../Domain/Ports/Store/CreateDAC';
import reducers from '../Reducers/CreateDAC';

const useRequest = () => {
    const [request, dispatch] = useReducer(reducers.requests, reducers.initialState.requests)

    const handlers: Dispatchers = {
        updateDAC: (object) => {
            dispatch({ type: "update", payload: { object: object } })
        }
    }
    return [request, handlers]
}

const useInput = () => {
    const [input, dispatch] = useReducer(reducers.input, reducers.initialState.input)

    const handlers: Dispatchers = {
        changeInput: (evt, index) => dispatch({ type: "change", payload: { evt: evt, index } })
    }
    return [input, handlers]
}

export { useRequest, useInput }