import React, { useState } from "react";
import { setKeyword } from "../../store/modules/search";
import { connect } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import styled from "styled-components";
import { Drawer, Icon } from "@material-ui/core";
import { IconContext } from "react-icons";
import { MdMenu } from "react-icons/md";

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
      <IconContext.Provider value={{color:"blue",size:"3em",style:{
        marginRight:"30px"
      }}}>
        <MdMenu onClick={()=>{
        setToggleDrawer(true);
      }}/>
      </IconContext.Provider>
      <Drawer open={props.toggleDrawer} anchor={"right"} onClose={()=>{
        setToggleDrawer(false);
      }}>
        <p>Fuck</p>
        <p>fees</p>
        <p>teges</p>
        <p>alet</p>
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
        }}
      >
        Home
      </Link>
      <SearchBox>
        <input
          type="text"
          placeholder="Search Team!!"
          onChange={_handleSearch}
          value={word}
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
        >
          Search
        </button>
      </SearchBox>
      <SideMenu toggleDrawer={toggleDrawer} />
    </Div>
  );
};

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 20px;
  margin-bottom: 20px;

  width: 100%;

  border-bottom: 1px solid black;
  border-radius: 15px;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
`;

const mapStateToProps = (state) => {
  return { word: state.Search.word };
};

const mapDispatchToProps = { setKeyword };

export default connect(mapStateToProps, mapDispatchToProps)(Top);
