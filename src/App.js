import React, { useEffect } from "react";
import styled from "styled-components";
import TeamRoute from "./routes/index";
import { BrowserRouter as Router } from "react-router-dom";

import { connect } from "react-redux";
import { setLoginTrue, setLoginFalse } from "./store/modules/CheckLogin";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function App(props) {
  useEffect(() => {
    if (cookies.get("isLogin") == true) {
      props.AsyncCookiesTrue();
      console.log("WHAT THE FUCK");
    } else {
      props.AsyncCookiesFalse();
    }
    console.log(props);
  }, [cookies.get("isLogin")]);

  // console.log(props.LoginStatus);
  return (
    <>
      <Router>
        <Div>
          <TeamRoute />
        </Div>
      </Router>
    </>
  );
}

const Div = styled.div`
  display: flex;
  // justify-content: center;
  // align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;

  height: 100%;
  width: 100%;
`;

const mapStateToProps = (state) => {
  return { LoginStatus: state.LoginStatus.status };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    AsyncCookiesTrue: () => dispatch(setLoginTrue()),
    AsyncCookiesFalse: () => dispatch(setLoginFalse()),
    ...ownProps,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
