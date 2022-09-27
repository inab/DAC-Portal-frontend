import { useReducer } from 'react';
import { Dispatchers } from '../../../../Domain/Ports/Store/ManagePolicies';
import reducers from '../Reducers/ManagePolicies';

const useRequest = () => {
    const [request, dispatch] = useReducer(reducers.requests, reducers.initialState.requests)

    const handlers : Dispatchers = {
        savePolicy: (object) => dispatch({ type: "save", payload: { object: object } })
    }
    return [request, handlers]
}

const useInput = () => {
    const [input, dispatch] = useReducer(reducers.input, reducers.initialState.input)

    const handlers : Dispatchers = {
        changePolicy: (evt) => dispatch({ type: "change", payload: { evt: evt } })
    }
    return [input, handlers]
}

export { useRequest, useInput }