class GameEngine:
    def __init__(self) -> None:
        self.prompts = ["You are all on a remote planet full of weird creatures and animals. Feel free to create scenarios and animals as you all traverse together across this foreign landscape."]
        self.curr_prompt = self.prompts[0]
        self.messages = []

    def reset(self):
        self.messages = []

    def add_message(self, msg):
        self.messages.append(msg)

