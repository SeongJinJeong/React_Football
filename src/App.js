import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Top from "./TopBar";
import Teams from "./Teams";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    _callApi()
      .then((res) => {
        setData(res);
        setTimeout(() => {
          console.log(res);
        }, 1000);
      })
      .catch((err) => console.log(err));
  }, []);

  const _callApi = async () => {
    const response = await fetch(
      "https://cors-anywhere.herokuapp.com/https://api-football-v1.p.rapidapi.com/v2/fixtures/live",
      {
        method: "GET",
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "3d3a997c8fmsh72c953500760ae9p12f8bcjsn336cae28920b",
        },
      }
    );
    const data = response.json();
    if (response.status !== 200) throw Error(data.message);
    return data;
  };

  console.log(Array.isArray(data));

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
  console.log(Array.isArray(props.array));
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
