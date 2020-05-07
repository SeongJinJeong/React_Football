import React from "react";
import styled from "styled-components";
import Header from "./scripts/Header";
import TeamRoute from "./routes/index";
import { BrowserRouter as Router } from "react-router-dom";

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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
`;

export default App;
