import * as Keycloak from 'keycloak-js';

const ManageAuthService = () => {
    const { REACT_APP_AUTH_URL } = process.env;
    
    const initOptions = { 
        url: REACT_APP_AUTH_URL, 
        realm: 'IPC', 
        clientId: 'dac-portal', 
        onLoad: 'login-required' 
    } 

    const keycloak = Keycloak(initOptions);

    const getUserRoles = () => {
        return keycloak.tokenParsed["dac:roles"] ? keycloak.tokenParsed["dac:roles"].filter(n => n)[0]
                                                                                    .map(el => el.split(":")
                                                                                    .pop()) 
                                                 : null
    }
    
    const userAuth = () => new Promise((resolve, reject) =>
        keycloak.init({ onLoad: initOptions.onLoad })
                .success((result) => resolve(result))
                .error((e) => reject(e))
    );
    
    const getRefreshToken = () => new Promise((resolve, reject) => {
        keycloak.updateToken(70)
                .success((result) => resolve(result))
                .error((e) => reject(e))
    });
    
    const getAccessToken = () => keycloak.token;

    return { userAuth, getUserRoles, getAccessToken, getRefreshToken }
}

export { ManageAuthService }