import React from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";
import { useHistory, Link } from "react-router-dom";

function Drawer(props) {
  return (
    <>
      <div
        style={{
          width: "100%",
          borderBottom: "1px solid black",
          marginBottom: "10px",
        }}
      >
        <IconContext.Provider value={{ color: "black", size: "3em" }}>
          <MdClose
            onClick={() => {
              props.setToggleDrawer(false);
            }}
          />
        </IconContext.Provider>
      </div>
      <Div>
        <Anchor>
          <Link to={`/fixtures/40`} style={{ textDecoration: "none", color: "black" }} >
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

  &:hover{
    color : green;
  }
`;

export { Drawer };
