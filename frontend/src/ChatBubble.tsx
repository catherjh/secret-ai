import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";

const ChatBubble = ({message, isUser}: {message: string, isUser: boolean}) => {
    console.log(message, isUser);
    return (
    <Card variant="outlined" style={{margin: '10px', width: '100%', backgroundColor: isUser? 'blue': 'white'}}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }}>{message}</Typography>
        </CardContent>
    </Card>
    )
}
export default ChatBubble;
