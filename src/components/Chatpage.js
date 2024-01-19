// src/components/ChatPage.js
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import "../App.css";
import server from "../server";

const ChatPage = () => {
  const { username } = useParams();
  const [messages, setMessages] = useState([]); //메세지 목록을 상태로 관리, 빈배열
  const [inputText, setInputText] = useState(""); //사용자가 입력한 텍스트를 상태로 관리

  const navigate = useNavigate();
  const scroll_ref = useRef(0);

  const handleSendMessage = () => {
    scroll_ref.current.scrollTop = scroll_ref.current.scrollHeight;
    //메세지를 전송하는 함수
    if (inputText !== "") {
      //입력값이 공백이 아니라면
      setMessages([...messages, { level: "me", msg: inputText }]); //현재 메시지 목록에 새로운 메시지를 추가
      setInputText("");
      server.emit("send", { username: username, msg: inputText });
    }
  };

  function handleSendKeyClick(e) {
    if (e.key == "Enter") {
      handleSendMessage();
    }
  }

  useEffect(() => {
    server.on("msg", (data) => {
      console.log(data);

      setMessages([...messages, data]);
    });
  }, [messages]);

  const handleGoBack = () => {
    navigate("/login");
  };

  return (
    <div className="centered-container">
      <div>
        <h2 className="chatbox">Chat BOX - {username}</h2>
        <div
          className="chat1"
          ref={scroll_ref}
          style={{
            height: "400px",
            overflowY: "auto",
            border: "2px solid #ccc",
            padding: "20px",
            // font,
          }}
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className="msg_box"
              style={{
                justifyContent:
                  message.level == "sys"
                    ? "center"
                    : message.level == ""
                    ? "start"
                    : "end",
              }}
            >
              {/* <div
                className="username_style"
                // style={{
                //   fontSize: "9px",
                //   position: "absolute",
                //   top: "-5px",
                //   left: "5px",
                // }}
              >
                {message.username}
              </div> */}

              <div className="username_style">{message.username}</div>
              <div className={message.level == "sys" ? "msg_center" : "msg"}>
                {message.msg}
              </div>
            </div>
          ))}
        </div>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleSendKeyClick}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
        <button onClick={handleGoBack}>Again Login</button>
      </div>
    </div>
  );
};

export default ChatPage;
