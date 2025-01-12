import React, { useState } from "react";
import "./App.css";

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = async () => {
    if (!userMessage.trim()) return;

    const newChat = { sender: "user", message: userMessage };
    setChatHistory([...chatHistory, newChat]);

    try {
      const response = await fetch("http://127.0.0.1:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      const botReply = { sender: "bot", message: data.response || "Error: No response" };
      setChatHistory((prevHistory) => [...prevHistory, botReply]);
    } catch (error) {
      console.error("Error communicating with the server:", error);
    }

    setUserMessage("");
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>ChatBot</h1>
      </header>
      <div className="chat-container">
        <div className="chat-history">
          {chatHistory.map((chat, index) => (
            <div key={index} className={`chat-message ${chat.sender === "user" ? "user" : "bot"}`}>
              {chat.message}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default App;
