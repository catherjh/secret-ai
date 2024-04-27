from flask import Flask, render_template
from flask_socketio import SocketIO, send
from engine import GameEngine
import asyncio

app = Flask(__name__, template_folder='template')
app.config['SECRET_KEY'] = 'secret_tunneellll, secret_tuneeneplll'
socketio = SocketIO(app, cors_allowed_origins="*")

game_engine = GameEngine()


async def call_llm():
    game_engine.add_message("I AM A LLM")
    send("I AM A LLM", broadcast=True)


@app.route("/")
def index():
    html_messages = ""
    for message in game_engine.messages:
        html_messages += '<div class="p-2 mb-2 bg-secondary text-white rounded">' + \
            message + '</div>'
    return render_template('index.html', html_messages=html_messages)


@socketio.on('message')
def handle_message(message):
    game_engine.add_message(message)
    send(message, broadcast=True)

    if len(game_engine.messages) % 3 == 0:
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.create_task(call_llm())


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', debug=True)
