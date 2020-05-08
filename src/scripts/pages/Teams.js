import React, { useEffect, useState } from "react";
import Top from "../public/TopBar";
import Main from "../public/Main";
import { useParams, useHistory } from "react-router-dom";
import callApi from "../../fetchApi";

const Call = callApi;

const Teams = (props) => {
  let { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    Call._callTeam(id).then((res) => setData(res.api.teams[0]));
  }, []);
  return (
    <>
      <Top history={history} />
      {data ? <RenderTeamInfo data={data} /> : <Main />}
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
