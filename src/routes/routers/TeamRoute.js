import React from "react";

import { Switch, Route } from "react-router-dom";

import Header from "../../scripts/Header";
import Top from "../../scripts/public/TopBar";

import Teams from "../../scripts/pages/Teams";
import Search from "../../scripts/pages/Search";
import Fixtures from "../../scripts/pages/Fixtures";

const TeamRoute = () => {
  return (
    <Switch>
      <Route path="/teams/:id" children={Teams}>
        <Teams />
      </Route>
      <Route path="/" exact={true}>
        <Header />
      </Route>
      <Route path="/search/:word" children={Top}>
        <Search />
      </Route>
      <Route path="/fixtures/:id" children={Fixtures}>
        <Fixtures />
      </Route>
    </Switch>
  );
};

export default TeamRoute;
