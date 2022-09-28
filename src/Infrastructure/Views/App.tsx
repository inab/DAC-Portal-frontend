import React from "react";
import { BrowserRouter, Route, RouteComponentProps, Switch } from "react-router-dom";

import "./assets/bootstrap/bootstrap.scss";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Layout from "./Layouts/Layout";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
      <Switch>
        <Route path="/" render={(props: RouteComponentProps) => <Layout {...props} />} />
      </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;

