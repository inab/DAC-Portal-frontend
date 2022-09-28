import React from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import CustomNavbar from "../Components/Navbars/CustomNavbar";
import Footer from "../Components/Footer/Footer";
import Sidebar from "../Components/Sidebar/Sidebar";
import { RouteWithFC } from "../Routes";
import { routes } from "../routes";

const Layout: React.FC<RouteComponentProps> = () => {
  const mainPanel = React.useRef(null);
  const role = localStorage.getItem("role");

  const getRoutes = (routes: Array<RouteWithFC>) => {
    return routes.map((prop: RouteWithFC, key: any) => {
      if (role === "dac-admin" && prop.layout === "/dac-admin") {
        return (
          <Route path={prop.layout + prop.path} render={(props) => <prop.component {...props} />} key={key}/>
        );
      } else if (role === "dac-member" && prop.layout === "/dac-member"){
        return (
          <Route path={prop.layout + prop.path} render={(props) => <prop.component {...props} />} key={key} />
        );
      } else if(role === "user" && prop.layout === "/user") {
        return (
          <Route path={prop.layout + prop.path} render={(props) => <prop.component {...props} />} key={key} />
        );
      } else {
        return (
          <Route path="/" exact render={(props) => <prop.component {...props} />} key={key} />
        )          
      }
    });
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar color="azure" image={""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <CustomNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Layout;
