import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { ManageAuthService } from '../../Application/UseCases/ManageAuth';

const App = React.lazy( () => import ('./App'));

(async () => {

    const AuthService = ManageAuthService();

    const isAuthenticated = await AuthService.userAuth();

    if(!isAuthenticated) window.location.reload();

    AuthService.getUserRoles() !== null ? AuthService.getUserRoles().includes("dac-admin") ? 
                                          localStorage.setItem("role", 'dac-admin') : 
                                          localStorage.setItem("role", 'dac-member') 
                                        : localStorage.setItem("role", 'user')
    
    const accessToken : string = AuthService.getAccessToken() || "";
    const refreshToken : any = await AuthService.getRefreshToken();

    localStorage.setItem("react-token", accessToken);
    localStorage.setItem("react-refresh-token", refreshToken);
    
    ReactDOM.render((<Suspense fallback={null}> <App/> </Suspense>), document.getElementById('root'));
})();

