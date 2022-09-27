import { State, Actions } from '../../../../Domain/Ports/Store/RequestsRevision';

const { REACT_APP_DAC_PORTAL_API_URL } = process.env

const INITIAL_STATE = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/user/status`,
    token: localStorage.getItem("react-token")
}

const requestsReducer = (state: State, action: Actions): any => {
    switch (action.type) {
        case "get":
            return state
    }
}

export default {
    initialState: INITIAL_STATE,
    requests : requestsReducer 
}

