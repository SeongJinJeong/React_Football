import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import callApi from "./fetchApi";
import styled from "styled-components";

const Call = callApi;

const Teams = (props) => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  useEffect(() => {
    Call._callTeamSearch(props.word)
      .then((res) => {
        setErr(false);
        setData(res.api.teams);
        if (res.api.teams.length === 0) setErr(true);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
      });
  }, [props.word]);

  console.log(data);
  console.log(err);

  return <p>{err ? "Something went Wrong" : <WriteTemas teams={data} />}</p>;
};

const WriteTemas = (props) => {
  const teams = props.teams;
  return teams.map((value, index) => {
    return (
      <>
        <TeamsDiv>
          <p key={index}>{"Name: " + value.name + " / ID: " + value.team_id}</p>
          <img
            src={value.logo}
            alt={value.name}
            style={{
              width: "100px",
              height: "100px",
            }}
          />
        </TeamsDiv>
      </>
    );
  });
};

const TeamsDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const mapStateToProps = ({ Search }) => {
  console.log(Search);
  return { word: Search.word };
};

export default connect(mapStateToProps, null)(Teams);
