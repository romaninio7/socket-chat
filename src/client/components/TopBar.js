import React, { useCallback } from "react";
import styled from "styled-components";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";

const socket = io("/");

const StyledTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #cd5cb9;
  border-radius: 4px 4px 0 0;
  height: 60px;
  width: 100%;
  color: #fff;
  padding: 0 25px;

  a {
    transition: all 0.5s ease;
    &:hover {
      color: white;
    }
    &:active {
      color: white;
    }
  }
`;

const Close = styled.a`
  color: #444;
  padding: 6px;
  cursor: pointer;
`;

const TopBar = ({ room }) => {
  const history = useHistory();

  const onClose = useCallback(() => {
    socket.disconnect();
    history.push("/");
  }, [history]);

  return (
    <StyledTopBar>
      <h3>Room: #{room}</h3>
      <Close onClick={onClose}>&#10005;</Close>
    </StyledTopBar>
  );
};

export default TopBar;
