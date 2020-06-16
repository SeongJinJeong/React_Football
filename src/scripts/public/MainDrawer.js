import React, { useState } from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";
import { useHistory, Link } from "react-router-dom";

import Cookies from "universal-cookie";
const cookies = new Cookies();

function Drawer(props) {
  const [isLogin, setIsLogin] = useState(false);

  const history = useHistory();

  return (
    <>
      <div
        style={{
          width: "100%",
          borderBottom: "1px solid black",
          marginBottom: "10px",
          display: "flex",
          flexDirection: "row",
          // justifyContent: "center"
        }}
      >
        <IconContext.Provider value={{ color: "black", size: "3em" }}>
          <MdClose
            onClick={() => {
              props.setToggleDrawer(false);
            }}
          />
        </IconContext.Provider>
        <div
          style={{
            position: "absolute",
            right: 0,
            display: "flex",
            flexDirection: "row",
          }}
        >
          <LoginButton isLogin={cookies.get("isLogin")} />
        </div>
      </div>
      <Div>
        <Anchor>
          <Link
            to={`/fixtures/40`}
            style={{ textDecoration: "none", color: "black" }}
          >
            LIVE
          </Link>
        </Anchor>
        <Anchor>
          <Link to={`/`} style={{ textDecoration: "none", color: "black" }}>
            COUNTRY
          </Link>
        </Anchor>
        <Anchor>
          <Link to={`/`} style={{ textDecoration: "none", color: "black" }}>
            LEAGUE
          </Link>
        </Anchor>
        <Anchor>
          <Link to={`/`} style={{ textDecoration: "none", color: "black" }}>
            PREDICTION
          </Link>
        </Anchor>
      </Div>
    </>
  );
}

const LoginButton = (props) => {
  // const isLogin = props.isLogin;

  if (props.isLogin == true) {
    return (
      <>
        <Anchor>
          <button
            style={{
              textDecoration: "none",
              color: "green",
              fontSize: "15px",
              marginRight: "5px",
              fontWeight: 600,
            }}
            onClick={() => {
              cookies.set("isLogin", false, { path: "/" });
              // console.log(isLogin);
              // window.location.reload(false);
            }}
          >
            LOGOUT
          </button>
        </Anchor>{" "}
      </>
    );
  } else {
    return (
      <>
        <Anchor>
          <Link
            to={`/login`}
            style={{
              textDecoration: "none",
              color: "green",
              fontSize: "15px",
              marginRight: "5px",
              fontWeight: 600,
            }}
          >
            LOGIN
          </Link>
        </Anchor>
        <Anchor>
          <Link
            to={`/register`}
            style={{
              textDecoration: "none",
              color: "blue",
              fontSize: "15px",
              marginRight: "5px",
              fontWeight: 600,
            }}
          >
            REGISTER
          </Link>
        </Anchor>{" "}
      </>
    );
  }
};

const Div = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Anchor = styled.p`
  width: 100%;

  background-color: light-gray;
  margin: 10px 0px;

  text-align: center;
  text-decoration: none;

  font-size: 20px;
  font-weight: bold;
  color: black;

  &:hover {
    color: green;
  }
`;

export { Drawer };
