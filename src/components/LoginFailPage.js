// LoginFailPage.js
import React from "react";
import { useNavigate } from "react-router-dom";

const LoginFailPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // 로그인 페이지로 돌아가는 버튼 클릭 시
    navigate("/login");
  };

  return (
    <div className="centered-container">
      <div className="logout-form">
        <h2>Login Failed</h2>
        <p>로그인에 실패했습니다.</p>
        <button onClick={handleGoBack}>다시 로그인</button>
      </div>
    </div>
  );
};

export default LoginFailPage;
