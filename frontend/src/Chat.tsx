import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";

import { io } from "socket.io-client";
import ChatBubble from "./ChatBubble";
import Header from "./Header";

interface MessageWithUser {
  message: string;
  user: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000");

    socket.on("chat", (msg: MessageWithUser) =>
      setMessages((prevMessages) => [...prevMessages, msg])
    );
    console.log("messages here", messages);

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue.trim() !== "") {
      const socket = io("http://127.0.0.1:5000");
      socket.emit("chat", inputValue);
      setInputValue("");
    }
  };

  return (
    <div>
      <Header />
      <div id="chat-area">
        {messages.map((messageWithUser, index) => (
          <ChatBubble key={index} message={messageWithUser.message} isUser={index % 2 === 0} />
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
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SendIcon
                    onClick={handleSubmit}
                    style={{ cursor: "pointer" }}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
