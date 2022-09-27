import { useReducer } from 'react';
import { Dispatchers } from '../Reducers/types/ManagePermissionsReducer';
import reducers from '../Reducers/ManagePermissions';

const useRequest = () => {
    const [request, dispatch] = useReducer(reducers.permissions, reducers.initialState)
 
    const handlers: Dispatchers = {
        deleteItem: (object, index) => {
            dispatch({ type: "delete", payload: { object: object, index: index } })
        }
    }
    return [request, handlers]
}

export { useRequest }