import React from "react";

import { Switch, Route } from "react-router-dom";

import Header from "../../scripts/Header";
import Teams from "../../scripts/pages/Teams";
import Search from "../../scripts/pages/Search";
import Top from "../../scripts/public/TopBar";

const TeamRoute = () => {
  return (
    <Switch>
      <Route path="/teams/:id">
        <Teams />
      </Route>
      <Route path="/" exact={true}>
        <Header />
      </Route>
      <Route path="/search/:word" children={Top}>
        <Search />
      </Route>
    </Switch>
  );
};

export default TeamRoute;
