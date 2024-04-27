from openai import OpenAI
from typing import List, Any, Dict


class OpenAIGateway:
    def __init__(self):
        self.client = OpenAI(api_key="sk-proj-pyM0mPz3ufWT39XBX9HbT3BlbkFJ3saHgWlykgOVzmAZeolm")
        self.system_prompt = """
            You are a chatbot who aims to go undetected in a chat room. Below are a sequence of messages already sent in the chat room. Disguise your style and conversation pattern so that the people in the chat room can\'t pinpoint you to be the AI. There is a conversation topic but adapt as necessary depending on how the other people in the room follow the conversation. Feel free to abandon proper capitalization, grammar and formal tone as you see fit. Do not try to answer like an AI bot but aim to maintain conversation like a human.
        """.strip()

    def chat_completion(self, messages: List[Dict[str, Any]]) -> str:
        response = self.client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[{"role": "system", "content": self.system_prompt}]
            + [{"role": "user", "content": m["message"]} for m in messages],
        )
        return response.choices[0].message.content
