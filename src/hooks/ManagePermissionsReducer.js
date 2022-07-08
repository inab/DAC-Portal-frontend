import { useReducer } from 'react';

const { REACT_APP_DAC_PORTAL_API_URL, REACT_APP_PERMISSIONS_URL } = process.env

const INITIAL_STATE = {
    type: 'get',
    url: `${REACT_APP_DAC_PORTAL_API_URL}/dac/requests`,
    token: localStorage.getItem("react-token"),
    params: {
      'format': null,
      'account-id': null
    }
}

const permissionsReducer = (state, action) => {
    switch (action.type) {
        case "get":
            return INITIAL_STATE
        case "delete":
            const { object, index } = action.payload;
            return {
                ...state,
                type: 'delete',
                url: `${REACT_APP_PERMISSIONS_URL}/permissions`,
                params: { 
                    'values': `${object.ga4gh_visa_v1.value}`,
                    'account-id': `${object.sub}`
                },
                index: index
            }
    }
}

const useRequest = () => {
    return useReducer(permissionsReducer, INITIAL_STATE)
}

export default useRequest