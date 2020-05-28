import React, { useEffect } from "react";
import styled from "styled-components";
import TeamRoute from "./routes/index";
import { BrowserRouter as Router } from "react-router-dom";
import callApi from "./fetchApi";

import Moment from "react-moment";
import "moment-timezone";

const Call = callApi;

function App() {
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
  width : 100%;
`;

export default App;
