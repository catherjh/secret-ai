import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const Chat = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000");

    socket.on("message", (msg: string) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      console.log("message", messages);
    });

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
          <div key={index} className="p-2 mb-2 bg-secondary text-white rounded">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message here..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button className="btn btn-primary" type="submit" id="button-addon2">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
