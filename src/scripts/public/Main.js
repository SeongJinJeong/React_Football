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

  useEffect(() => {
    Call._callTeamSearch(props.word)
      .then(
        (res) => {
          setErr(false);
          setData(res.api.teams);
          if (props.word && res.api.results === 0) {
            setErrMsg("There is no such teams!");
            setErr(true);
          }
        },
        (reject) => {
          setErr(true);
          setData([]);
          setErrMsg(reject);
        }
      )
      .catch((err) => {
        console.log(err);
        setErr(true);
        setErrMsg("Something went wrong");
      });
  }, [props.word]);

  useEffect(() => {
    Call._callTeam(40).then((res) => console.log(res));
  }, []);

  return err ? <p>{errMsg}</p> : <WriteTemas teams={data} />;
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
