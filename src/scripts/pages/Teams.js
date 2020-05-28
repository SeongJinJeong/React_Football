import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

import Top from "../public/TopBar";
import callApi from "../../fetchApi";

const Call = callApi;

const Teams = (props) => {
  let { id } = useParams();
  const [data, setData] = useState([]);

  const history = useHistory();

  useEffect(() => {
    Call._callTeam(id).then((res) => setData(res.api.teams[0]));
  }, []);
  return (
    <>
      <Top />
      <AlignCenter>
        {data ? <RenderTeamInfo data={data} /> : "There is no such Teams..."}
      </AlignCenter>
    </>
  );
};

const RenderTeamInfo = (props) => {
  const history = useHistory();
  const teamData = props.data;

  return (
    <>
      <img src={teamData.logo} alt={teamData.name} />
      <p>Name : {teamData.name}</p>
      <p>Code : {teamData.code}</p>
      <p>Country : {teamData.country}</p>
      <p>Founded Date : {teamData.founded}</p>
      <p>Venue Name : {teamData.venue_name}</p>
      <p>Venue Address : {teamData.venue_address}</p>
      <button onClick={() => history.push(`/fixtures/${teamData.team_id}`)}>
        Show Matches
      </button>
    </>
  );
};

const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default Teams;
