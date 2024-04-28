import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useRef,
} from "react";
import _ from "lodash";

import { io } from "socket.io-client";
import ChatBubble from "./ChatBubble";
import Header from "./Header";
import { TextareaAutosize } from "@mui/material";

interface MessageWithUser {
  message: string;
  user: string;
}

const Chat = ({
  userId,
  setUsers,
}: {
  userId: string;
  setUsers: Dispatch<SetStateAction<string[]>>;
}) => {
  const [messages, setMessages] = useState<MessageWithUser[]>([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const socket = io("http://127.0.0.1:5000");

    socket.on("chatResponse", (msg: MessageWithUser) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      setUsers((prevUsers) => _.uniq([...prevUsers, msg.user]));
    });

    return () => {
      socket.disconnect();
    };
  }, [messages, setUsers]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputValue.trim() !== "") {
      const socket = io("http://127.0.0.1:5000");
      socket.emit("chatRequest", JSON.stringify({ inputValue, userId }));
      setInputValue("");
    }
  };

  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full">
      <Header />
      <div
        id="chat-area"
        style={{ margin: "auto", maxHeight: "400px", overflowY: "auto" }}
        ref={chatAreaRef}
      >
        {messages.map((messageWithUser) => (
          <ChatBubble
            message={messageWithUser.message}
            username={messageWithUser.user}
            isUser={messageWithUser.user === userId}
          />
        ))}
      </div>
      <div className="input-group">
        <TextareaAutosize
          className="w-full border-2 border-purple-500 rounded"
          value={inputValue}
          minRows={2}
          placeholder="Enter to chat..."
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            if (e.target.value.endsWith("\n")) {
              handleSubmit(e);
            } else {
              setInputValue(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
};

export default Chat;
