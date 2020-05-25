import React, { useEffect, useState, useRef } from "react";
import Moment from "react-moment";
import { CircularProgress } from "@material-ui/core";
import styled from "styled-components";

import Search from "../public/TopBar";
import callApi from "../../fetchApi";

const Call = callApi;

function Main() {
  const [fixture, setFixture] = useState([]);
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("Loading");

  useEffect(() => {
    function _setFixt(arr) {
      const fixtures = [];
      arr.map((value, index) => {
        Call._callFixture(value.fixture_id).then((res) => {
          fixtures.push(res.api.fixtures[0]);
        });
      });
      return fixtures;
    }

    Call._callLive()
      .then((res) => {
        if (res.api.results !== 0) {
          console.log(res);
          const liveData = Object.values(res.api.fixtures);
          console.log(liveData);
          // const what = _setFixt(liveData);
          setFixture(liveData);
          setStatus(true);
        } else {
          setMsg("There is no match on Live");
          setStatus(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log();
  return (
    <>
      <Search />
      {status ? <RenderLive data={fixture} /> : <CircularProgress />}
    </>
  );
}

const RenderLive = (props) => {
  const data = props.data;
  const [fixt, setFixt] = useState([]);
  const [onLoad, setOnLoad] = useState(false);
  const [msg, setMsg] = useState("");

  console.log("In the RenderLive: ", data);

  useEffect(() => {
    if (data.length > 0) {
      data.map((value, index) => {
        console.log(value);
        Call._callFixture(value.fixture_id)
          .then((res) => {
            setFixt((old) => [...old, res.api.fixtures[0]]);
            setOnLoad(true);
            console.log(fixt);
          })
          .catch((err) => {
            console.log(err);
            setOnLoad(false);
            setMsg("Something went wrong while getting Fixture Data");
          });
      });
    } else {
      setOnLoad(false);
      setMsg("There is no Fixtures on Live");
    }
  }, [data]);

  return (
    <>
      <h1>Live</h1>
      {onLoad ? <RenderFixts fixt={fixt} /> : msg}
    </>
  );
};

const RenderFixts = (props) => {
  const fixt = props.fixt;
  console.log(fixt);
  return fixt.map((value, index) => {
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

export default Main;
