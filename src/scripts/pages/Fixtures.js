import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Top from "../public/TopBar";
import Main from "../public/Main";
import { useParams } from "react-router-dom";
import callApi from "../../fetchApi";

const Call = callApi;

const Fixtures = (props) => {
  let { id: teamId } = useParams();
  const [fixtures, setFixtures] = useState([]);
  useEffect(() => {
    Call._callTeamFixture(teamId).then((res) =>
      setFixtures(res.api.fixtures.reverse())
    );
  }, []);

  return (
    <>
      <Top />
      <RenderFixtures fixtures={fixtures} />
    </>
  );
};

const RenderFixtures = (props) => {
  const fixtures = props.fixtures;
  const futureFixtures = fixtures.filter((data) => {
    if (data.event_timestamp > Date.now() / 1000) return data;
  });
  console.log(futureFixtures)
  return futureFixtures.map((value, index) => {
    return (
      <Div>
        <Team away>
          <img src={value.awayTeam.logo} />
          <p style={{ fontWeight: "bold", fontSize:"30px" }}>{value.awayTeam.team_name}</p>
        </Team>
        {/* <p style={{fontWeight:"bold",fontSize:"50px",float:"unset"}}>VS</p> */}
        <Team>
          <img src={value.homeTeam.logo} />
          <p style={{ fontWeight: "bold", color:"white", fontSize:"30px" }}>{value.homeTeam.team_name}</p>
        </Team>
      </Div>
    );
  });
};

const Div = styled.div`
  width: 80%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 20px 0px;
`;

const Team = styled.div`
  width: 40%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color : ${props=>props.away?"#f79071":"#342ead"};

  padding :20px;
`;

export default Fixtures;
