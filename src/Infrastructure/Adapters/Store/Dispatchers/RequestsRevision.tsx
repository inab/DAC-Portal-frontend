import { useReducer } from 'react';
import reducers from '../Reducers/RequestsRevision';

const useRequest = () => {
    const [request, dispatch] = useReducer(reducers.requests, reducers.initialState)
    
    return [request, dispatch]
} 

export { useRequest }