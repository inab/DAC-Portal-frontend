import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/bootstrap/bootstrap.scss";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Layout from "layouts/Layout.js";

const App = () => {
  return (
    <React.Fragment>
      <BrowserRouter>
      <Switch>
        <Route path="/" render={(props) => <Layout {...props} />} />
      </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;

