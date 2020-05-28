import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Top from "../public/TopBar";
import Contents from "./SearchContents";
import callApi from "../../fetchApi";

const Call = callApi;

const Search = (props) => {
  let { word: teamName } = useParams();
  return (
    <>
      <Top />
      <AlignCenter>
        <Contents teamName={teamName} />
      </AlignCenter>
    </>
  );
};

const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default Search;
