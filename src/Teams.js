import React from "react";
import { connect } from "react-redux";

const Teams = (props) => {
  console.log(props);
  return <p>{props.word || "undefined"}</p>;
};

const mapStateToProps = ({ word }) => ({
  word,
});

export default connect(mapStateToProps, null)(Teams);
