import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import callApi from "./fetchApi";

const Call = callApi;

const Teams = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    Call._callTeamSearch(props.word).then((res) => {
      setData(res.api.teams);
    });
  }, [props.word]);

  console.log(data);

  return <p>{<WriteTemas teams={data} /> || "undefined"}</p>;
};

const WriteTemas = (props) => {
  const teams = props.teams;
  return teams.map((value, index) => {
    return value.name + " /";
  });
};

const mapStateToProps = ({ Search }) => {
  console.log(Search);
  return { word: Search.word };
};

export default connect(mapStateToProps, null)(Teams);
