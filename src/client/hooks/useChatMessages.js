import { useState, useEffect, useCallback } from "react";
import queryString from "query-string";
import io from "socket.io-client";

const socket = io("/");

const useChatMessages = (location) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    setRoom(room);
    setName(name);

    socket.emit("signin", { name, room }, (error) => {
      if (error) {
        console.warn(error);
      }
    });
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((msgs) => [...msgs, message]);
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const sendMessage = useCallback(
    (event) => {
      event.preventDefault();

      if (message) {
        socket.emit("sendMessage", message, () => setMessage(""));
      }
    },
    [message]
  );

  return { setMessage, sendMessage, messages, message, users, room, name };
};

export default useChatMessages;
