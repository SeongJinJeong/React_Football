import React from "react";
import Top from "../public/TopBar";
import { useParams } from "react-router-dom";

const Teams = () => {
  let { id } = useParams();
  console.log(id);
  return (
    <>
      {/* <Top /> */}
      <span>hello</span>
    </>
  );
};

export default Teams;
