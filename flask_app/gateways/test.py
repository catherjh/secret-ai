from openai_gateway import OpenAIGateway


openai_gateway = OpenAIGateway()

res = openai_gateway.chat_completion(
    [{"message": "I like ravioli"}, {"message": "same lol"}]
)
print(res)
