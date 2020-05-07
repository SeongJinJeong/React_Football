import React, { useEffect, useState } from "react";
import Top from "../public/TopBar";
import { useParams } from "react-router-dom";
import callApi from "../../fetchApi";

const Call = callApi;

const Teams = () => {
  let { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    Call._callTeam(id).then((res) => setData(res.api.teams[0]));
  }, []);
  return (
    <>
      <Top />
      <RenderTeamInfo data={data} />
    </>
  );
};

const RenderTeamInfo = (props) => {
  const data = props.data;
  return (
    <>
      <img src={data.logo} alt={data.name} />
      <p>Name : {data.name}</p>
      <p>Code : {data.code}</p>
      <p>Country : {data.country}</p>
      <p>Founded Date : {data.founded}</p>
      <p>Venue Name : {data.venue_name}</p>
      <p>Venue Address : {data.venue_address}</p>
    </>
  );
};

export default Teams;
