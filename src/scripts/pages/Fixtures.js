import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Moment from "react-moment";

import Top from "../public/TopBar";
import Main from "../public/Main";
import { useParams } from "react-router-dom";
import callApi from "../../fetchApi";

const Call = callApi;

const Fixtures = (props) => {
  let { id: teamId } = useParams();
  const [fixtures, setFixtures] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Call._callTeamFixture(teamId).then((res) => {
      setFixtures(res.api.fixtures.reverse());
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Top />
      {loading ? "Now Loading" : <RenderFixtures fixtures={fixtures} />}
    </>
  );
};

const RenderFixtures = (props) => {
  const fixtures = props.fixtures;
  const futureFixtures = fixtures.filter((data) => {
    if (data.event_timestamp < Date.now() / 1000) return data;
  });
  // .reverse();
  console.log(futureFixtures);
  return futureFixtures.map((value, index) => {
    return (
      <>
        <Div>
          <Team>
            <img
              src={value.homeTeam.logo}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <p style={{ fontWeight: "bold", color: "white", fontSize: "30px" }}>
              {value.homeTeam.team_name}
            </p>
          </Team>
          <Team away>
            <img
              src={value.awayTeam.logo}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <p style={{ fontWeight: "bold", fontSize: "30px" }}>
              {value.awayTeam.team_name}
            </p>
          </Team>
        </Div>
        <Div style={{ margin: 0 }}>
          <TeamDesc left>
            <h2
              style={{
                padding: "5px",
                border: "3px solid blue",
                borderRadius: "5px 5px 5px 5px",
              }}
            >
              Home
            </h2>
            <h1>
              {value.goalsHomeTeam !== null ? value.goalsHomeTeam : "NONE"}
            </h1>
          </TeamDesc>
          <TeamDesc>
            <h2
              style={{
                padding: "5px",
                border: "3px solid red",
                borderRadius: "5px 5px 5px 5px",
              }}
            >
              Away
            </h2>
            <h1>
              {value.goalsAwayTeam !== null ? value.goalsAwayTeam : "NONE"}
            </h1>
          </TeamDesc>
        </Div>
        <Div info>
          <MatchInfo>
            <p style={{ margin: 0 }}>
              <b>Event Date</b> :{" "}
              <Moment
                interval={0}
                date={value.event_date}
                format="YYYY/MM/DD"
              ></Moment>
            </p>
            <p style={{ margin: 0 }}>
              <b>Status</b> : {value.status}
            </p>
            <p style={{ margin: 0 }}>
              <b>Referee</b> : {value.referee !== null ? value.referee : "NONE"}
            </p>
            <p />
            <p style={{ margin: 0 }}>
              <b>League</b> :{" "}
              {value.league.name !== null ? value.league.name : "NONE"}
            </p>
            <p style={{ margin: 0 }}>
              <b>Round</b> : {value.round !== null ? value.round : "NONE"}
            </p>
            <p />
            <p style={{ margin: 0 }}>
              <b>Venue</b> : {value.venue !== null ? value.venue : "NONE"}
            </p>
          </MatchInfo>
        </Div>
      </>
    );
  });
};

const Div = styled.div`
  width: 80%;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: ${(props) => (props.info ? null : 20)}px;
`;

const Team = styled.div`
  min-width: 40%;
  max-width: 40%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${(props) => (props.away ? "#f79071" : "#342ead")};

  padding: 20px;

  min-height: 300px;
  max-height: 300px;
`;

const TeamDesc = styled(Team)`
  background-color: white;

  border-right: ${(props) => (props.left ? "1px dashed black" : null)};
`;

const MatchInfo = styled.div`
  width: 80%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 20px;

  border: 2px solid black;
  border-radius: 10px;
`;

export default Fixtures;
