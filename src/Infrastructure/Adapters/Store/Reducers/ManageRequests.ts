import { State, Actions } from '../../../../Domain/Ports/Store/ManageRequests';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

const INITIAL_STATE : State = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests`,
    params: {
        format: undefined,
        accountId: undefined,
        status: "Pending"
    },
    index: undefined
}

const requestsReducer = (state: State, action: Actions): any => {
    const { object, index } = action.payload;

    switch (action.type) {
        case "accept":
            return {
                ...state,
                type: 'put',
                url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests/accept`,
                params: {
                    id: `${object.id}`,
                    accountId: `${object.userId}`,
                    acl: `${object.resource}`,
                    format: "PLAIN"
                },
                index: index
            }  
        case "delete":
            return {
                ...state,
                type: 'put',
                url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests/reject`,
                params: {
                    id: `${object.id}`,
                    acl: `${object.resource}`
                },
                index: index
            } 
        default:
            return state
    }
} 

export default {
    initialState: INITIAL_STATE,
    requests : requestsReducer 
}