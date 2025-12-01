import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Bot, User, Send, MessageCircle } from "lucide-react";

type Message = {
  id: number;
  type: "user" | "ai";
  content: string;
  timestamp: string;
};

const AIChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 💬 Simple frontend “AI” – no API required
  const mockAIResponse = async (question: string): Promise<string> => {
    // simulate thinking time
    await new Promise((resolve) => setTimeout(resolve, 900));
    const q = question.toLowerCase();

    if (q.includes("average") || q.includes("mean")) {
      return "The average tells you the central value of your dataset. Add all the values together, then divide by how many values you have.";
    }
    if (q.includes("trend") || q.includes("increase") || q.includes("decrease")) {
      return "A trend describes how your values change over time. If later values are usually higher, that suggests an upward trend. If they’re lower, that’s a downward trend.";
    }
    if (q.includes("outlier") || q.includes("weird") || q.includes("anomaly")) {
      return "An outlier is a value that is much higher or lower than the rest of the data. It can heavily affect the average and sometimes should be investigated separately.";
    }
    if (q.includes("median")) {
      return "The median is the middle value when your data is sorted. It’s useful because it isn’t pulled around by extreme high or low values like the average can be.";
    }
    if (q.includes("week 4")) {
      return "In Week 4, you focused on data processing with map, filter, and reduce. You also built a Data Analyzer that computes statistics from arrays.";
    }

    // generic fallback
    return "Great question! Try asking about averages, trends, or outliers in a dataset, and I’ll explain how to think about them.";
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = {
      id: Date.now(),
      type: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const aiText = await mockAIResponse(text);
      const aiMsg: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: aiText,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestions = [
    "Explain what an average means.",
    "How can I tell if my data has a trend?",
    "What is an outlier?",
    "Why is the median useful?",
  ];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5" />
          Week 7: AI Data Chat
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Messages area */}
        <div className="chat-container">
          {messages.length === 0 && !loading ? (
            <div className="text-center text-gray-500 mt-6">
              <MessageCircle className="h-8 w-8 mx-auto mb-2 opacity-60" />
              <p>Ask me questions about data, averages, trends, and more.</p>
              <p className="text-xs mt-1">
                Tip: Try &quot;What is an outlier?&quot;
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={
                    msg.type === "user" ? "chat-bubble-user" : "chat-bubble-ai"
                  }
                >
                  <div className="chat-meta">
                    {msg.type === "user" ? (
                      <>
                        <User className="h-3 w-3" />
                        <span>You</span>
                      </>
                    ) : (
                      <>
                        <Bot className="h-3 w-3" />
                        <span>AI Tutor</span>
                      </>
                    )}
                    <span className="ml-auto">{msg.timestamp}</span>
                  </div>
                  <p>{msg.content}</p>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex justify-start mt-2">
              <div className="chat-bubble-ai">
                <div className="chat-meta">
                  <Bot className="h-3 w-3" />
                  <span>AI Tutor</span>
                </div>
                <div className="chat-loading-dots">
                  <span className="chat-loading-dot" />
                  <span
                    className="chat-loading-dot"
                    style={{ animationDelay: "0.12s" }}
                  />
                  <span
                    className="chat-loading-dot"
                    style={{ animationDelay: "0.24s" }}
                  />
                  <span className="text-xs text-gray-500 ml-2">
                    Thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input + send */}
        <div className="flex gap-2">
          <Input
            placeholder="Ask a question about your data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Suggested prompts */}
        <div className="flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <Badge
              key={s}
              variant="outline"
              className="chat-suggestion-pill"
              onClick={() => setInput(s)}
            >
              {s}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChatBox;
