import { State, Actions } from '../../../../Domain/Ports/Store/ManagePolicies';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

const INITIAL_STATE_REQUEST : State["request"] = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/policies`,
    params: {
        id: undefined,
        dacId: undefined,
        fileId: undefined,
        acl: undefined,
        value: undefined
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
                    id: `${object.id}`,
                    dacId: `${object.dacId}`,
                    fileId: `${object.fileId}`,
                    acl: `${object.acl}`,
                    value: `${object.value}`
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