import { State, Actions } from '../../../../Domain/Ports/Store/ManageRequests';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

const INITIAL_STATE : State = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests/pending`,
    params: {
        'format': undefined,
        'account-id': undefined
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
                url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests/grant`,
                params: {
                    'format': "PLAIN",
                    'account-id': `${object.user}`,
                    'acl': `${object.resource}`,
                    'object-id': `${object._id}`
                },
                index: index
            }  
        case "delete":
            return {
                ...state,
                type: 'delete',
                url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests/deny`,
                params: {
                    'acl': `${object.resource}`,
                    'object-id': `${object._id}`
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