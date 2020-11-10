import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateBuilding from "../Components/Register/Building";
import Dashboard from "../Components/Dashboard";
import Building from "../Components/FetchData/Dashboard";
import Admin from "../Components/Admin";

function Views() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/dashboard/:id">
            <Building />
          </Route>
          <Route exact path="/dashboard/">
            <Dashboard />
          </Route>
          <Route exact path="/admin/:id">
            <Admin />
          </Route>
          <Route exact path="/registration">
            <CreateBuilding />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default Views;
