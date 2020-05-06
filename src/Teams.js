import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import callApi from "./fetchApi";
import styled from "styled-components";

const Call = callApi;

const Teams = (props) => {
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
            setErrMsg("There is no data");
            setErr(true);
          }
        },
        (reject) => {
          setErr(true);
          setData([]);
          setErrMsg(reject);
          console.log(reject);
        }
      )
      .catch((err) => {
        console.log(err);
        setErr(true);
      });
  }, [props.word]);

  console.log(errMsg);
  //   Call.promiseIt(1)
  //     .then(
  //       (get) => console.log(get),
  //       (get) => console.log(get)
  //     )
  //     .catch((err) => console.log(err));
  //   console.log(Call.promiseIt);

  return <p>{err ? errMsg : <WriteTemas teams={data} />}</p>;
};

const WriteTemas = (props) => {
  const teams = props.teams;
  return teams.map((value, index) => {
    return (
      <>
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
      </>
    );
  });
};

const TeamsDiv = styled.div`
  display: flex;
  justfiy-content: center;
  flex-direction: column;
`;

const mapStateToProps = ({ Search }) => {
  console.log(Search);
  return { word: Search.word || Search.err };
};

export default connect(mapStateToProps, null)(Teams);
