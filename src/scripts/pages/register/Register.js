import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import Top from "../../public/TopBar";
import callApi from "../../../fetchApi";
const Call = callApi;

const Register = () => {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");
  const [nickname, setNickName] = useState("");
  const [button, setButton] = useState(false);

  const history = useHistory();

  const handleNickName = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setNickName(value);
  };

  const handleIdInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setId(value);
  };

  const handlePasswdInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setPasswd(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(id, passwd, nickname);
    if(id.length > 5 && passwd.length > 5 && nickname.length > 5){
        const data = {
        id,
        password: passwd,
        name: nickname,
      };
      Call._registerPost(data)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      history.push("/");
    } else{
      alert("Three of them must over 5 Spells")
    }
  };

  return (
    <>
      <Top />
      <AlignCenter>
        <Div>
          <Wrapper>
            <h1
              style={{
                fontWeight: "bolder",
                color: "#3da4ab",
              }}
            >
              REGISTER
            </h1>
            <p>
              NICKNAME :{" "}
              <input type="text" placeholder="ID" onChange={handleNickName} />
            </p>
            <p>
              ID :{" "}
              <input type="text" placeholder="ID" onChange={handleIdInput} />
            </p>
            <p>
              PASSWD :{" "}
              <input
                type="password"
                placeholder="PASSWORD"
                onChange={handlePasswdInput}
              />
            </p>
            <input
              type="submit"
              placeholder="SUBMIT"
              onClick={handleSubmit}
              style={{
                position: "relative",
                bottom: "-30px",
              }}
              disabled={button}
            />
          </Wrapper>
        </Div>
      </AlignCenter>
    </>
  );
};

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

const AlignCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  height: 100%;
`;

export default Register;
