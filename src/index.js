import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const Keycloak = require('keycloak-js');

const { REACT_APP_AUTH_URL, REACT_APP_AUTH_REALM, REACT_APP_AUTH_CLIENT } = process.env

let initOptions = {
    url: REACT_APP_AUTH_URL, realm: REACT_APP_AUTH_REALM, clientId: REACT_APP_AUTH_CLIENT, onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);

keycloak.init({ onLoad: initOptions.onLoad }).success((auth) => {

    if (!auth) {
        window.location.reload();
    } else {
        console.info("Authenticated");
    }

    localStorage.setItem("react-token", keycloak.token);
    localStorage.setItem("react-refresh-token", keycloak.refreshToken);

    let roles;

    if (keycloak.tokenParsed["dac:roles"]) {
        roles = keycloak.tokenParsed["dac:roles"].filter(n => n)[0];
        if (roles.map(el => el.includes("dac-admin"))) {
            localStorage.setItem("role", 'dac-admin');
        } else if (roles.map(el => elincludes("dac-member"))) {
            localStorage.setItem("role", 'dac-member');
        }
    } else {
        localStorage.setItem("role", 'user');
    }

    setTimeout(() => {
        keycloak.updateToken(70).success((refreshed) => {
            if (refreshed) {
                console.debug('Token refreshed' + refreshed);
            } else {
                console.warn('Token not refreshed, valid for '
                    + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
            }
        }).error(() => {
            console.error('Failed to refresh token');
        });
    }, 60000)

    ReactDOM.render(<App />, document.getElementById('root'));

}).error(() => {
    console.error("Authenticated Failed");
});
