import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";
import Chip from "@material-ui/core/Chip";
import { CircularProgress } from "@material-ui/core";

import callApi from "../../fetchApi";
import Top from "../public/TopBar";

const cookies = new Cookies();

const MyPage = (props) => {
  const history = useHistory();
  const [data, setData] = useState({});
  const [chips, setChips] = useState([]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    callApi._getUserInfo(cookies.get("userId")).then((res) => {
      console.log(res);
      if (res.data.succeed !== true) {
        alert("Something Went Wrong! Please relogin");
        cookies.remove("userId");
        cookies.set("isLogin", false, { path: "/" });
        history.push("/");
      } else {
        setData({
          no: res.data.data.no,
          id: res.data.data.id,
          name: res.data.data.name,
        });
        // setChips(res.data.data.tags.split(","));
        const d = res.data.data.tags;
        const dArr = d.split(",");
        console.log(dArr);
        setChips(dArr);
        setLoading(false);
      }
    });
  }, []);

  const handleDelete = (chipToDelete) => {
    setChips((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  return (
    <>
      <Top />
      {loading ? (
        <CircularProgress />
      ) : (
        <AlignCenter>
          <Div>
            <Wrapper>
              <Title style={{ color: "#b6eb7a" }}>MY PAGE</Title>
              <Texts>Name : {data.name}</Texts>
              <Texts>ID : {data.id}</Texts>
              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {" "}
                {() => {
                  console.log(chips);
                }}
                {chips.map((value, index) => {
                  return (
                    <Chip
                      label={value}
                      color="secondary"
                      onDelete={handleDelete(value)}
                    />
                  );
                })}
              </div>
              <button
                type="submit"
                onClick={() => {
                  history.push("/");
                }}
                style={{ marginTop: "20px" }}
              >
                Save
              </button>
            </Wrapper>
          </Div>
        </AlignCenter>
      )}
    </>
  );
};

//----------------------- Wrapper CSS ---------------------------------
//---------------------------------------------------------------------

const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100%;
`;

const Div = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`;

const Wrapper = styled.form`
  width: 75%;
  height: 75%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  border: 3px solid black;
  border-radius: 30px;
`;

//---------------------------  Div CSS  -------------------------------
//---------------------------------------------------------------------

const TagDiv = styled.div`
  display: flex;
  flex-direction: rows;
  flex-wrap: wrap;
`;

//---------------------------   Text CSS  -----------------------------
//---------------------------------------------------------------------

const Title = styled.h1`
  font-weight: bold;
`;

const Texts = styled.p`
  font-size: 15px;
  margin: 0;
  margin-bottom: 10px;
`;
export default MyPage;
