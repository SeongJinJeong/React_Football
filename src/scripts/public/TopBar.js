import React, { useState } from "react";
import { setKeyword } from "../../store/modules/search";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { Drawer, Icon } from "@material-ui/core";
import { IconContext } from "react-icons";
import { MdMenu } from "react-icons/md";
import { IoIosFootball } from "react-icons/io";

import { Drawer as MainDrawer } from "./MainDrawer";

const Top = (props) => {
  const [word, setWord] = useState("");
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const _handleSearch = (event) => {
    event.persist();
    setWord(event.target.value);
  };

  const history = useHistory();

  const SideMenu = (props) => {
    return (
      <>
        <IconContext.Provider
          value={{
            color: "blue",
            size: "3em",
            style: { marginLeft: "5px", minWidth:"3em" },
          }}
        >
          <MdMenu
            onClick={() => {
              setToggleDrawer(true);
            }}
          />
        </IconContext.Provider>
        <Drawer
          open={props.toggleDrawer}
          anchor={"right"}
          onClose={() => {
            setToggleDrawer(false);
          }}
        >
          <div
            style={{
              minWidth: "300px",
              width: document.body.clientWidth * 0.3,
            }}
          >
            <MainDrawer setToggleDrawer={setToggleDrawer} />
          </div>
        </Drawer>
      </>
    );
  };

  return (
    <Div>
      <Link
        to={"/"}
        style={{
          height: "100%",
          textDecoration: "none",
        }}
      >
        <IconContext.Provider
          value={{
            color: "black",
            size: "4em",
          }}
        >
          <IoIosFootball />
          <p
            style={{
              textAlign: "center",
              fontWeight: "bold",
              margin: 0,
              color: "black",
            }}
          >
            BETFOOT
          </p>
        </IconContext.Provider>
      </Link>
      <SideBox>
        <SearchBox>
          <input
            type="text"
            placeholder="Search Teams!!"
            onChange={_handleSearch}
            value={word}
            style={{
              width:"100%",
              maxWidth:"200px",
              minWidth:"80px"
            }}
          ></input>
          <button
            onClick={() => {
              if (word.length <= 3) {
                alert("Team name should be over 3 Spells!");
              } else {
                props.setKeyword(word);
                setWord("");
                history.push(`/search/${word}`);
              }
            }}
            type="submit"
            style={{
              borderRadius: "20px",
              backgroundColor: "green",
              color: "white",
            }}
          >
            Search
          </button>
        <SideMenu toggleDrawer={toggleDrawer} />
        </SearchBox>
      </SideBox>
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  padding: 20px;
  margin-bottom: 20px;

  width: 100%;

  border-bottom: 1px solid black;
`;

const SideBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 20%;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;

  width: 100%;
`;

const mapStateToProps = (state) => {
  return { word: state.Search.word };
};

const mapDispatchToProps = { setKeyword };

export default connect(mapStateToProps, mapDispatchToProps)(Top);
