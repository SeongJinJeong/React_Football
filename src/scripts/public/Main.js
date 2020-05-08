import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import callApi from "../../fetchApi";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const Call = callApi;

const Main = (props) => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [loading, setLoading] = useState(false);

  const teamName = props.teamName || props.word;

  useEffect(() => {
    setLoading(true);
    Call._callTeamSearch(teamName)
      .then((res) => {
        console.log(res);
        setErr(false);
        setData(res.api.teams);
        if (props.word && res.api.results === 0) {
          setErrMsg("There is no such teams!");
          setErr(true);
        } else if (props.word === undefined && res.api.results === 0) {
          setErrMsg("Please enter something");
          setErr(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
        setErrMsg("Something went wrong");
        setLoading(false);
      });
  }, [props.word]);

  return err ? (
    <p>{errMsg}</p>
  ) : loading ? (
    "Now Loading"
  ) : (
    <WriteTemas teams={data} />
  );
};

const WriteTemas = (props) => {
  const teams = props.teams;
  return teams.map((value, index) => {
    return (
      <>
        <Link to={`/teams/${value.team_id}`}>
          <TeamsDiv key={index}>
            <p>{"Name: " + value.name + " / ID: " + value.team_id}</p>
            <img
              src={value.logo}
              alt={value.name}
              style={{
                width: "100px",
                height: "100px",
              }}
            />
          </TeamsDiv>
        </Link>
      </>
    );
  });
};

const TeamsDiv = styled.div`
  display: flex;
  justfiy-content: center;
  align-items: center;
  flex-direction: column;
`;

const mapStateToProps = ({ Search }) => {
  return { word: Search.word || Search.err };
};

export default connect(mapStateToProps, null)(Main);
