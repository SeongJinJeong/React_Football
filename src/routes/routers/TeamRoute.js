import React from "react";

import { Switch, Route } from "react-router-dom";

import Header from "../../scripts/Header";
import Teams from "../../scripts/pages/Teams";

const TeamRoute = () => {
  return (
    <Switch>
      <Route path="/teams/:id">
        <Teams />
      </Route>
      <Route path="/" exact={true}>
        <Header />
      </Route>
    </Switch>
  );
};

export default TeamRoute;
