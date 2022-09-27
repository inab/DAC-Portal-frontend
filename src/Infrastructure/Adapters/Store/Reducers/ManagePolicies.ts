import { State, Actions } from '../../../../Domain/Ports/Store/ManagePolicies';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

const INITIAL_STATE_REQUEST : State["request"] = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/policies`,
    params: {
        'dac-id': undefined,
        'ds-id': undefined,
        'acl': undefined,
        'policy': undefined
    }
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

export default {
    initialState: {
        requests : INITIAL_STATE_REQUEST,
        input : INITIAL_STATE_INPUT
    },
    requests : policiesRequestReducer,
    input : policiesInputReducer 
}