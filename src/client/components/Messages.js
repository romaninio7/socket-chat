import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Message from "./Message";

const Container = styled.div`
  overflow-y: scroll;
`;

const Messages = ({ messages, name }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <Container>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </Container>
  );
};

export default Messages;
