import React from "react";
import styled from "styled-components";

import useChatMessages from "../hooks/useChatMessages";
import TopBar from "../components/TopBar";
import Input from "../components/Input";
import { Container } from "../components/SignIn";
import Messages from "../components/Messages";

const ChatContainer = styled(Container)`
  flex-direction: column;
`;

const ChatBack = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #ffffff;
  border-radius: 8px;
  height: 60%;
  width: 80%;
  box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.28);
`;

const ActiveUsers = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  justify-content: flex-start;
  color: #fbc378;
  h2 {
    opacity: 0.3;
  }
  div {
    margin: 0 20px;
  }
`;

const Chat = ({ location }) => {
  const {
    setMessage,
    sendMessage,
    messages,
    message,
    users,
    room,
    name,
  } = useChatMessages(location);

  return (
    <ChatContainer>
      <ChatBack>
        <TopBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          users={users}
          name={name}
        />
      </ChatBack>
      {users && users.length && (
        <ActiveUsers>
          <h2>Active users: </h2>
          {users.map(({ name }) => (
            <div key={name}>{name}</div>
          ))}
        </ActiveUsers>
      )}
    </ChatContainer>
  );
};

export default Chat;
