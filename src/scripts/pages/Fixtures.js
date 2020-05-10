import React, { useEffect, useState } from "react";
import Top from "../public/TopBar";
import Main from "../public/Main";
import { useParams } from "react-router-dom";
import callApi from "../../fetchApi";

const Call = callApi;

const Fixtures = (props) => {
  let { id: teamId } = useParams();
  const [fixtures, setFixtures] = useState([]);
  useEffect(() => {
    Call._callTeamFixture(teamId).then((res) =>
      setFixtures(res.api.fixtures.reverse())
    );
  }, []);

  console.log(fixtures)

  return (
      <>
      <Top />
      <RenderFixtures fixtures={fixtures}/>
    </>
  );
};

const RenderFixtures = (props) =>{
    const fixtures = props.fixtures;
    const futureFixtures = fixtures.filter((data)=>{
        if(data.event_timestamp>Date.now()/1000) return data;
    });
    return(
        <>
            
        </>
    )
}

export default Fixtures;
