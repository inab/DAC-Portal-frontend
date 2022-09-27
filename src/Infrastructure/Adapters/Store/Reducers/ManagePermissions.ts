import { State, Actions } from '../../../../Domain/Ports/Store/ManagePermissions';

const { REACT_APP_DAC_PORTAL_API_URL, REACT_APP_PERMISSIONS_URL } = process.env

const INITIAL_STATE : State = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests/accepted`,
    params: {
        'format': undefined,
        'account-id': undefined,
        'acl': undefined,
        'object-id': undefined,
        'values': undefined
    },
    index: undefined
}

const permissionsReducer = (state: State, action: Actions): any => {
    const { object, index } = action.payload;
    switch (action.type) {
        case "delete":
            return {
                ...state,
                type: 'delete',
                url: `${REACT_APP_PERMISSIONS_URL}/permissions`,
                params: {
                    'account-id': object.sub,
                    'values': object.value
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