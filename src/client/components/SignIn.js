import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import useSystemUsername from "../hooks/useSystemUsername";

export const Container = styled.div`
  color: #333;
  display: flex;
  justify-content: center;
  text-align: center;
  height: 100vh;
  align-items: center;
  background-color: #4158d0;
  background-image: linear-gradient(
    43deg,
    #4158d0 0%,
    #c850c0 46%,
    #ffcc70 100%
  );
  h1 {
    color: #fffdc2;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.28);
  }
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  border-radius: 5px;
  padding: 15px 20px;
  width: 100%;
  border: none;
  box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.28);
  margin: 10px;
`;

const Button = styled.button`
  color: #fff;
  text-transform: uppercase;
  text-decoration: none;
  background: #cf5eb8;
  padding: 20px;
  border-radius: 5px;
  display: inline-block;
  border: none;
  width: 100%;
  margin: 10px;
  box-shadow: 0px 0px 15px 2px rgba(0, 0, 0, 0.28);
  transition: all 0.5s ease;
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    background: #333;
  }
`;

const SignIn = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const currentUser = useSystemUsername();
  const history = useHistory();

  return (
    <Container>
      <InnerContainer>
        <h1>Sign in to the chat</h1>

        <Input
          placeholder="Name"
          className="joinInput"
          type="text"
          onChange={(event) => setName(event.target.value)}
        />

        <Input
          placeholder="Room"
          className="joinInput mt-20"
          type="text"
          onChange={(event) => setRoom(event.target.value)}
        />

        <Button
          className={"button mt-20"}
          type="submit"
          disabled={!room || !name}
          onClick={() => history.push(`/chat?name=${name}&room=${room}`)}
        >
          Join {name && <>as</>} {name}
        </Button>

        {currentUser && (
          <Button
            type="button"
            disabled={!room}
            onClick={() =>
              history.push(`/chat?name=${currentUser}&room=${room}`)
            }
          >
            Join as {currentUser}
          </Button>
        )}
      </InnerContainer>
    </Container>
  );
};

export default SignIn;
