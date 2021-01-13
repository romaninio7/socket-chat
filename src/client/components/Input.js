import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const UserList = styled.ul`
  position: absolute;
  bottom: 100px;
  left: 30px;
  list-style: none;
  background: white;
  margin: 0;
  padding: 0;
  border-radius: 4px;
  box-shadow: 1px 0px 16px 0px rgba(0, 0, 0, 0.43);
  animation: fadein 1s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const UserSelect = styled.li`
  cursor: pointer;
  padding: 8px 20px;
  transition: all 0.5s ease;
  border-radius: 5px;
  &:hover {
    background: #dc7da6;
  }
`;

const Form = styled.form`
  display: flex;
  border-top: 1px solid #e8e8e8;
`;

const StyledInput = styled.input`
  border: none;
  border-radius: 0;
  padding: 20px;
  width: 80%;
  font-size: 1.2em;
  outline: none;
  color: #444;
`;

const Button = styled.button`
  color: #fff;
  background: #d974ab;
  padding: 20px;
  border: none;
  width: 21%;
  font-size: 1.5em;
  outline: none;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background: #f9bd7b;
  }
`;

const Input = ({ message, setMessage, sendMessage, users, name }) => {
  const [openUsersList, setOpenUsersList] = useState(false);
  const [selectedUserNames, setSelectedUserNames] = useState([]);
  const messageInput = useRef();

  useEffect(() => {
    setSelectedUserNames((prevState) =>
      prevState.filter((username) => message.includes(`@${username}`))
    );
  }, [message]);

  const onInputMessage = useCallback(
    (e) => {
      const { value } = e.target;
      setMessage(value);
      if (value.substr(value.length - 1) === "@") {
        setOpenUsersList(true);
      } else {
        setOpenUsersList(false);
      }
    },
    [setMessage]
  );

  const onSelectUser = useCallback((userName) => {
    setMessage((prevState) => `${prevState}${userName} `);
    setSelectedUserNames((prevState) => [...prevState, userName]);
    setOpenUsersList(false);
    messageInput.current.focus();
  }, []);

  return (
    <Container>
      <Form>
        <StyledInput
          ref={messageInput}
          type="text"
          id="messageInput"
          placeholder="Type a message..."
          value={message}
          onChange={onInputMessage}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
        <Button onClick={(e) => sendMessage(e)}>Send</Button>
      </Form>
      {users.length > 0 && openUsersList && (
        <UserList>
          {users
            .filter((user) => user.name !== name.trim().toLowerCase()) // retrieve current user
            .filter((user) => !selectedUserNames.includes(user.name)) // retrieve all already selected users
            .map((user) => (
              <UserSelect key={user} onClick={() => onSelectUser(user.name)}>
                {user.name}
              </UserSelect>
            ))}
        </UserList>
      )}
    </Container>
  );
};

export default Input;
