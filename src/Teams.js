import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import callApi from "./fetchApi";

const Call = callApi;

const Teams = (props) => {
  const [data, setData] = useState([]);
  const [err, setErr] = useState(false);
  useEffect(() => {
    Call._callTeamSearch(props.word)
      .then((res) => {
        setErr(false);
        setData(res.api.teams);
      })
      .catch((err) => {
        console.log(err);
        setErr(true);
      });
  }, [props.word]);

  console.log(data);

  return <p>{err ? "Something went Wrong" : <WriteTemas teams={data} />}</p>;
};

const WriteTemas = (props) => {
  const teams = props.teams;
  return teams.map((value, index) => {
    return <p key={index}>{value.name + " / " + value.team_id}</p>;
  });
};

const mapStateToProps = ({ Search }) => {
  console.log(Search);
  return { word: Search.word };
};

export default connect(mapStateToProps, null)(Teams);
