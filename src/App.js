import React from "react";
import styled from "styled-components";
import Top from "./TopBar";
import Teams from "./Teams";

function App() {
  return (
    <>
      <Div>
        <Top />
        <Teams />
      </Div>
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
