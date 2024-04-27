from flask import Flask, render_template
from flask_socketio import SocketIO, send
from engine import GameEngine
import asyncio

from gateways.openai_gateway import OpenAIGateway

app = Flask(__name__, template_folder="template")
app.config["SECRET_KEY"] = "secret_tunneellll, secret_tuneeneplll"
socketio = SocketIO(app, cors_allowed_origins="*")

game_engine = GameEngine()
openai_gateway = OpenAIGateway()


@app.route("/")
def index():
    html_messages = ""
    for message in game_engine.messages:
        html_messages += (
            '<div class="p-2 mb-2 bg-secondary text-white rounded">'
            + message
            + "</div>"
        )
    return render_template("index.html", html_messages=html_messages)


@socketio.on("message")
def handle_message(message):
    game_engine.add_message(message)
    send(message, broadcast=True)

    if len(game_engine.messages) % 3 == 0:
        # TODO: store previous messages as dicts in the game engine instead of converting here
        previous_messages = [{"message": m} for m in game_engine.messages]
        msg = openai_gateway.chat_completion(previous_messages)
        game_engine.add_message(msg)
        send(msg, broadcast=True)
        print("Received")


if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", debug=True)
