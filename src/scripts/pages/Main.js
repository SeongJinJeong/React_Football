import React, { useEffect, useState, useRef } from "react";
import Search from "../public/TopBar";
import callApi from "../../fetchApi";
import Moment from "react-moment";

const Call = callApi;

function Main() {
  const [fixture, setFixture] = useState([]);
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    function _setFixt(arr) {
      const fixtures = [];
      arr.map((value, index) => {
        Call._callFixture(value.fixture_id).then((res) => {
          fixtures.push(res.api.fixtures[0]);
        });
      });
      return fixtures;
    }

    Call._callLive()
      .then((res) => {
        if (res.api.results !== 0) {
          console.log(res);
          const liveData = Object.values(res.api.fixtures);
          console.log(liveData);
          const what = _setFixt(liveData);
          setFixture(what);
          setStatus(true);
        } else {
          setMsg("There is no match on Live");
          setStatus(false);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(fixture);
  return (
    <>
      <Search />
      {status ? <RenderLive data={fixture} /> : <p>{msg}</p>}
    </>
  );
}

const RenderLive = (props) => {
  const data = props.data;
  console.log("In the RenderLive: ", data);
  console.log(data.length);
  return data.map((value, index) => {
    console.log(value);
    return (
      <>
        <Moment
          interval={0}
          date={value.event_date}
          format="YYYY/MM/DD"
        ></Moment>
      </>
    );
  });
};

export default Main;
