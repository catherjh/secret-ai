import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Avatar } from "@mui/material";

const ChatBubble = ({
  message,
  username,
  isUser,
}: {
  message: string;
  username: string;
  isUser: boolean;
}) => {
  console.log(message, isUser);
  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${username.slice(0, 2)}`,
    };
  }
  return (
    <span className="w-100" style={{ display: "flex", alignItems: "center" }}>
      {!isUser ? <Avatar {...stringAvatar(username)}></Avatar> : null}
      <Card variant="outlined" style={{ margin: "10px", width: "100%" }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 14, textAlign: isUser ? "right" : "left" }}
          >
            {message}
          </Typography>
        </CardContent>
      </Card>
      {isUser ? <Avatar {...stringAvatar(username)}></Avatar> : null}
    </span>
  );
};
export default ChatBubble;
