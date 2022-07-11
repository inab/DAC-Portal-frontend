import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ManageAuthService } from './Services/ManageAuth';

const App = React.lazy( () => import ('./App'));

(async () => {

    const AuthService = ManageAuthService();

    const isAuthenticated = await AuthService.userAuth();

    if(!isAuthenticated) window.location.reload();

    AuthService.getUserRoles() !== null ? AuthService.getUserRoles().includes("dac-admin") ? 
                                          localStorage.setItem("role", 'dac-admin') : 
                                          localStorage.setItem("role", 'dac-member') 
                                        : localStorage.setItem("role", 'user')
    
    localStorage.setItem("react-token", AuthService.getAccessToken());
    localStorage.setItem("react-refresh-token", await AuthService.getRefreshToken());
    
    ReactDOM.render((<Suspense fallback={null}> <App/> </Suspense>), document.getElementById('root'));
})();

