import React, { useEffect, useState } from "react";
import Top from "../public/TopBar";
import Main from "../public/Contents";
import { useParams } from "react-router-dom";
import callApi from "../../fetchApi";

const Call = callApi;

const Search = (props) => {
  let { word: teamName } = useParams();
  return (
    <>
      <Top />
      <Main teamName={teamName} />
    </>
  );
};

export default Search;
