import React from "react";
import styled from "styled-components";
import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";
import { useHistory } from "react-router-dom";

function Drawer(props) {
  return (
    <>
      <IconContext.Provider value={{color:"black",size:"3em",style:{float:"right"}}}>
        <MdClose onClick={()=>{
          props.setToggleDrawer(false);
        }}/>
      </IconContext.Provider>
      <Div>
        <p>Fuck</p>
        <p>fees</p>
        <p>teges</p>
        <p>alet</p>
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

export { Drawer };
