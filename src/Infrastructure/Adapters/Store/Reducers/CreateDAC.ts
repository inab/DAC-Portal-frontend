import { State, Actions } from '../../../../Domain/Ports/Store/CreateDAC';

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

export default {
    initialState: {
        requests : INITIAL_STATE_REQUEST,
        input : INITIAL_STATE_INPUT
    },
    requests : dacsRequestsReducer,
    input : dacsInputReducer 
}

