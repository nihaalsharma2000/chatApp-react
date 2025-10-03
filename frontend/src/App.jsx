import { useState } from "react";
import useSocket from "./hooks/useSocket"; // Keep your existing custom hook
import "./app.css";

export default function App() {
  const { messages, joinRoom, sendMessage } = useSocket();
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [joined, setJoined] = useState(false);

  const handleJoin = () => {
    if (username && room) {
      joinRoom(username, room);
      setJoined(true);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(username, room, message);
      setMessage("");
    }
  };

  return (
    <div>
      {!joined ? (
        <div className="join-container">
          <h1>Join Chat Room</h1>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={handleJoin}>Join Room</button>
        </div>
      ) : (
        <div className="chat-container">
          <h2>Room: {room}</h2>
          <div className="messages">
            {messages.map((msg, i) => {
              let msgClass = "message";
              if (msg.username === "System") msgClass += " system-message";
              else if (msg.username === username) msgClass += " message-right";
              else msgClass += " message-left";

              return (
                <div key={i} className={msgClass}>
                  {msg.username !== "System" && (
                    <strong>{msg.username}: </strong>
                  )}
                  {msg.text}
                </div>
              );
            })}
          </div>

          <div className="input-row">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}
