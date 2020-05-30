import React from "react";

import { Switch, Route } from "react-router-dom";

import Main from "../../scripts/pages/Main";
import Top from "../../scripts/public/TopBar";

import Teams from "../../scripts/pages/Teams";
import Search from "../../scripts/pages/Search";
import Fixtures from "../../scripts/pages/Fixtures";
import Login from "../../scripts/pages/login/Login";
import Register from "../../scripts/pages/register/Register";

const TeamRoute = () => {
  return (
    <Switch>
      <Route path="/" exact={true}>
        <Main />
      </Route>
      <Route path="/teams/:id" children={Teams}>
        <Teams />
      </Route>
      <Route path="/search/:word" children={Top}>
        <Search />
      </Route>
      <Route path="/fixtures/:id" children={Fixtures}>
        <Fixtures />
      </Route>
      <Route path="/login" children={Login}>
        <Login />
      </Route>
      <Route path="/register" children={Login}>
        <Register />
      </Route>
    </Switch>
  );
};

export default TeamRoute;
