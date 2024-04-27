import React from "react";
import "./App.css";
import Chat from "./Chat";
import { Voting } from "./Voting";

/**
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat Interface</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js" type="text/javascript"></script>

    <style>
        #chat-area {
            height: 400px;
            overflow-y: scroll;
        }
    </style>
</head>
<body>
    <div class="container py-3">
        <div class="bg-light p-3 mb-3">
            <h4 class="text-center">Chat Prompt: Continue the conversation!</h4>
        </div>
        <div id="chat-area" class="border rounded p-3 mb-3">
            <!-- Chat messages will be appended here -->
        </div>
        <form id="chat-form">
            <div class="input-group">
                <input type="text" class="form-control" id="message-input" placeholder="Type your message here..." aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-primary" type="submit" id="button-addon2">Send</button>
            </div>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.socket.io/4.0.0/socket.io.min.js"></script>
    <script>
        var socket = io();

        $(document).ready(function() {
            $('#chat-form').submit(function(event) {
                event.preventDefault();
                var message = $('#message-input').val();
                if(message.trim() !== '') {
                    console.log("emit message");
                    socket.emit('message', message);
                    $('#message-input').val('');
                }
            });

            socket.on('message', function(msg) {
                var messageElement = '<div class="p-2 mb-2 bg-secondary text-white rounded">' + msg + '</div>';
                $('#chat-area').append(messageElement);
                $('#chat-area').scrollTop($('#chat-area')[0].scrollHeight);
            });
        });
    </script>
</body>
</html>
 */

const App: React.FC<{}> = () => (
  <div className="flex justify-center items-center h-screen flex-col">
    <Chat />
    <Voting />
  </div>
);

export default App;
