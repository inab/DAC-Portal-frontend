import { State, Actions } from '../../../../Domain/Ports/Store/ManagePermissions';

const { REACT_APP_DAC_PORTAL_API_URL, REACT_APP_PERMISSIONS_URL } = process.env

const INITIAL_STATE : State = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests`,
    params: {
        format: undefined,
        accountId: undefined,
        status: "Accepted"
    },
    index: undefined
}

const permissionsReducer = (state: State, action: Actions): any => {
    const { object, index } = action.payload;

    switch (action.type) {
        case "delete":
            return {
                ...state,
                type: 'put',
                url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests/revoke`,
                params: {
                    accountId: `${object.sub}`,
                    acl: `${object.value}`
                },
                index: index
            }
        default:
            return state
    }
}

export default {
    initialState: INITIAL_STATE,
    permissions : permissionsReducer
}