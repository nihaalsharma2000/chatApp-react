import { useEffect, useState } from "react";
import { io } from "socket.io-client";

let socket;

export default function useSocket() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket = io("http://localhost:3500");

    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinRoom = (username, room) => {
    socket.emit("joinRoom", { username, room });
  };

  const sendMessage = (username, room, text) => {
    socket.emit("sendMessage", { username, room, text });
  };

  return { messages, joinRoom, sendMessage };
}
