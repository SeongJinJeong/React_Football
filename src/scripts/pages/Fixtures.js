import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Moment from "react-moment";
import { CircularProgress } from "@material-ui/core";


import Top from "../public/TopBar";
import { useParams } from "react-router-dom";
import callApi from "../../fetchApi";

const Call = callApi;

Array.prototype.division = function (n) {
  const arr = this;
  const len = arr.length;
  const cnt = Math.floor(len / n) + (Math.floor(len % n) > 0 ? 1 : 0);
  let tmp = [];
  for (let i = 0; i < cnt; i++) {
    tmp.push(arr.splice(0, n));
  }
  return tmp;
};

const Fixtures = (props) => {
  let { id: teamId } = useParams();
  const [fixtures, setFixtures] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    function sortArray(arr) {
      const sortedFixtures = [];
      arr.filter((value) => {
        return value.filter((fixt) => {
          if (
            fixt.event_timestamp <= Math.floor(Date.now() / 1000) &&
            fixt.statusShort === "FT"
          ) {
            sortedFixtures.push(fixt);
          }
        });
      });
      return sortedFixtures.division(10);
    }

    Call._callTeamFixture(teamId).then((res) => {
      setFixtures(sortArray(res.api.fixtures.reverse().division(10)));
      setLoading(false);
    });
  }, []);

  console.log(page);

  return (
    <>
      <Top />
      {loading ? (
        <CircularProgress />
      ) : (
        <CheckFixture fixtures={fixtures} page={page} />
      )}
      {loading || page === fixtures.length ? null : (
        <MoreBox
          id="moreBtn"
          onClick={(event) => {
            setPage(page + 1);
            if (page - 1 === fixtures.length) {
              handleMoreClick(event);
            }
          }}
        >
          More
        </MoreBox>
      )}
    </>
  );
};

const CheckFixture = (props) => {
  const fixt = props.fixtures;
  console.log(fixt);
  const curPage = props.page;
  const getFixtures = [];
  for (let i = 0; i < curPage; i++) {
    getFixtures.push(<RenderFixtures fixtures={fixt[i]} key={i}/>);
  }
  return getFixtures;
};

const handleMoreClick = (e) => {
  console.log(e.target.id);
  const el = document.getElementById(e.target.id);
  el.parentNode.removeChild(el);
};

const RenderFixtures = (props) => {
  const fixtures = props.fixtures;
  // const dividedFixture = fixtures.division(10);
  // console.log(dividedFixture);
  // .reverse();

  return fixtures.map((value, index) => {
    return (
      <>
        <Div key={index}>
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

const MoreBox = styled.div`
  width: 20%;

  background-color: white;
  color: black;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 20px;
  margin-top: 20px;

  border: 2px solid green;
  border-radius: 10px;

  font-size: 30px;
  font-weight: bold;

  &:hover {
    background-color: green;
    border: 2px solid green;
    color: white;
    cursor: pointer;
  }
`;

export default Fixtures;
