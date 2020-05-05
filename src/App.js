import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Top from "./TopBar";
import Teams from "./Teams";
import callApi from "./fetchApi";

const Call = callApi;

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Call._callH2h(33, 34)
      .then((res) => {
        setData(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Div>
        <Top />
        <Teams />
      </Div>
    </>
  );
}

const RenderThis = (props) => {
  const data = props.array;
  return data.map((value, index) => {
    return (
      <>
        <p>{value.name}</p>
        <img
          src={value.logo}
          style={{
            width: "50px",
            height: "50px",
          }}
        ></img>
      </>
    );
  });
};

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
`;

export default App;
