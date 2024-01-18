import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import server from "../server";

const LoginPage = () => {
  const [loginError, setLoginError] = useState(null);
  const usernameRef = useRef(null); //사용자 이름과 비밀번호 입력 필드에 대한 가변 객체 레퍼런스
  const passwordRef = useRef(null);
  const navigate = useNavigate(); //페이지 이동 함수

  const handleLogin = () => {
    const enteredUsername = usernameRef.current.value; //사용자이름과 비밀번호 값을 가져옴
    const enteredPassword = passwordRef.current.value;

    server.emit("login", usernameRef.current.value);

    //둘중 하나라도 비어있으면 로그인 실패
    if (enteredUsername.trim() === "" || enteredPassword.trim() === "") {
      navigate(`/login-fail`);
    } else {
      navigate(`/chat/${enteredUsername}`);
    }
  };

  return (
    <div className="centered-container">
      <div className="login-form">
        <h2>Login Page</h2>
        <label>
          Username:
          <input type="text" ref={usernameRef} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" ref={passwordRef} />
        </label>
        <br />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
