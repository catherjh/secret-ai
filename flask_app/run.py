from flask import Flask, session
from flask_socketio import SocketIO, emit
from engine import GameEngine
import asyncio
import string
import random


from gateways.openai_gateway import OpenAIGateway

app = Flask(__name__)
app.config["SECRET_KEY"] = "secret_tunneellll, secret_tuneeneplll"
socketio = SocketIO(app, cors_allowed_origins="*")

game_engine = GameEngine()
openai_gateway = OpenAIGateway()


@socketio.on("chat")
def handle_message(message):
    if "user" not in session or session["user"] not in game_engine.users:
        username = ''.join(random.choices(
            string.ascii_uppercase + string.digits, k=5))
        session["user"] = username
        game_engine.users.append(username)

    game_engine.add_message({"msg": message, "user": session["user"]})
    emit("chat", session["user"] + ": " + message, broadcast=True)

    if len(game_engine.messages) % 3 == 0:
        # TODO: store previous messages as dicts in the game engine instead of converting here
        previous_messages = [{"message": m} for m in game_engine.messages]
        msg = openai_gateway.chat_completion(previous_messages)
        game_engine.add_message(msg)
        emit("chat", ("AI", msg), broadcast=True)
        print("Received")


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", debug=True)
