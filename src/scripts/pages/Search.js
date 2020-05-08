import React, { useEffect, useState } from "react";
import Top from "../public/TopBar";
import Main from "../public/Main";
import { useParams } from "react-router-dom";
import callApi from "../../fetchApi";

const Call = callApi;

const Search = () => {
  let { word: teamName } = useParams();
  console.log(teamName);
  return (
    <>
      <Top />
      <Main teamName={teamName} />
    </>
  );
};

export default Search;
