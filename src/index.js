import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { getAccessToken, getRefreshToken, getUserRoles, userAuth } from './Services/ManageAuth';

(async () => {
    const isAuthenticated = await userAuth();

    if(!isAuthenticated) window.location.reload();

    getUserRoles() !== null ? getUserRoles().includes("dac-admin")  ? localStorage.setItem("role", 'dac-admin') : 
                                                                      localStorage.setItem("role", 'dac-member') 
                            : localStorage.setItem("role", 'user')
    
    localStorage.setItem("react-token", getAccessToken());
    localStorage.setItem("react-refresh-token", await getRefreshToken());
    
    ReactDOM.render(<App/>, document.getElementById('root'));
})();

