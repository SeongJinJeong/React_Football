import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { setLoginTrue } from "../../../store/modules/CheckLogin";

import Top from "../../public/TopBar";
import callApi from "../../../fetchApi";

import Cookies from "universal-cookie";
const cookies = new Cookies();

const Login = ({ setIsLoginCookieTrue }) => {
  const [id, setId] = useState("");
  const [passwd, setPasswd] = useState("");

  const history = useHistory();

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
    console.log(id, passwd);
    const data = {
      id: id,
      password: passwd,
    };
    callApi
      ._loginPost(data)
      .then((res) => {
        console.log(res.data.succeed);
        if (res.data.succeed == true) {
          console.log(res.data.info);
          cookies.set("isLogin", true, { path: "/" });
          setIsLoginCookieTrue();
          history.push("/");
        } else {
          alert(res.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(setIsLoginCookieFalse);

  return (
    <>
      <Top />
      <AlignCenter>
        <Div>
          <Wrapper>
            <h1
              style={{
                fontWeight: "bolder",
                color: "#a8df65",
              }}
            >
              LOGIN
            </h1>
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

const mapDispatchToProps = (dispatch) => {
  console.log(dispatch);
  return {
    setIsLoginCookieTrue: () => dispatch(setLoginTrue()),
  };
};

export default connect(null, mapDispatchToProps)(Login);
