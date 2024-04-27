import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { io } from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000");

    socket.on("message", (msg: string) =>
      setMessages((prevMessages) => [...prevMessages, msg])
    );

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue.trim() !== "") {
      const socket = io("http://127.0.0.1:5000");
      socket.emit("message", inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      <div id="chat-area">
        {messages.map((message, index) => (
          <div key={index} className="p-2 mb-2 bg-secondary rounded">
            {message}
          </div>
        ))}
      </div>
      <div className="input-group">
        <TextField
          value={inputValue}
          label="Type your message here..."
          variant="standard"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
        />
        <Button variant="contained" onClick={handleSubmit}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
