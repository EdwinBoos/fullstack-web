import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter, Route, Switch } from "react-router-dom";
import "./css/index.css";
import App from "./component/App";
import User from "./component/User";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <Router>
      <Switch>
        <Route exact path="/" component={withRouter(App)} />
        <Route path="/users/:userId" component={withRouter(User)} />
      </Switch>
  </Router>,
  document.getElementById("root")
);
registerServiceWorker();
