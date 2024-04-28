from flask import Flask, session
from flask_socketio import SocketIO, emit
from engine import GameEngine
import asyncio
import string
import random
import json

from custom_types import MessageWithUser
from gateways.openai_gateway import OpenAIGateway
from guardrails.hub import NSFWText
from guardrails import Guard

# Use the Guard with the validator
guard = Guard().use(
    NSFWText, threshold=0.8, validation_method="sentence", on_fail="exception"
)


app = Flask(__name__)
app.config["SECRET_KEY"] = "secret_tunneellll, secret_tuneeneplll"
socketio = SocketIO(app, cors_allowed_origins="*")

game_engine = GameEngine()
openai_gateway = OpenAIGateway()


@socketio.on("chat")
def handle_message(message):
    message_object = json.loads(message)
    if "user" not in session or session["user"] not in game_engine.users:
        username = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=5))
        session["user"] = username
        game_engine.users.append(username)

    try:
        guard.validate(message)
    except Exception as e:
        print(e)
        emit('error', {'error': 'No profanity'}, broadcast = False)
        return

    user_input = MessageWithUser(
        user=message_object['userId'], message=message_object['inputValue'])
    game_engine.add_message(user_input)
    emit("chat", dict(user_input), broadcast=True)

    if len(game_engine.messages) % 3 == 0:
        msg = openai_gateway.chat_completion(game_engine.messages)
        ai_output = MessageWithUser(user=game_engine.ai_username, message=msg)
        game_engine.add_message(ai_output)
        emit("chat", dict(ai_output), broadcast=True)
        print("Received")


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", debug=True)
