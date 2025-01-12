from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Chatbot endpoint
@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    # Basic chatbot response logic
    bot_responses = {
        "hello": "Hi there! How can I assist you today?",
        "how are you": "I'm just a bot, but I'm here to help you!",
        "bye": "Goodbye! Have a great day!",
    }
    response = bot_responses.get(user_message.lower(), "I'm not sure how to respond to that.")

    return jsonify({'response': response})

if __name__ == '__main__':
    app.run(debug=True)
