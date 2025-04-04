
import { useState, useRef, useEffect } from "react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

// Predefined first responses to make the app feel more interactive
const ASSISTANT_RESPONSES = [
  "To improve tomato yield, ensure consistent watering, provide full sun exposure, and fertilize with phosphorus-rich nutrients. Prune suckers for better air circulation and stake plants for support.",
  "For organic pest control, try neem oil spray for aphids and whiteflies, introduce ladybugs as natural predators, use diatomaceous earth for crawling insects, and plant companion herbs like basil and marigold to repel pests naturally.",
  "The best crops for sandy soil include carrots, radishes, potatoes, lettuce, and strawberries. These plants thrive in well-draining conditions. Consider adding compost to improve soil structure and water retention.",
  "Signs of nitrogen deficiency in plants include yellowing of older leaves (chlorosis), stunted growth, and smaller than normal leaves. Apply compost, aged manure, or a balanced organic fertilizer to address this issue.",
  "To prepare your garden for winter, clear debris and dead plants, add a layer of compost, plant cover crops like clover or rye, mulch perennial beds, and clean and store tools properly to prevent rust.",
];

export default function Assistant() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API response with delay
    setTimeout(() => {
      // Get a random predefined response
      const responseIndex = Math.floor(Math.random() * ASSISTANT_RESPONSES.length);
      const responseContent = ASSISTANT_RESPONSES[responseIndex];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="container py-6 flex-1 flex flex-col">
        <PageHeader
          title="AI Farming Assistant"
          description="Get answers to your farming questions, crop recommendations, and best practices"
        />

        <div className="flex-1 flex flex-col">
          <Card className="flex-1 flex flex-col overflow-hidden">
            <CardContent className="flex-1 flex flex-col p-0">
              {/* Messages area */}
              <div className="flex-1 overflow-y-auto p-4">
                {messages.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      <Bot className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">How can I help with your farming?</h3>
                    <p className="text-muted-foreground max-w-md">
                      Ask me about crop recommendations, disease management, soil health, irrigation methods, or any other farming question.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6">
                      {[
                        "How do I improve tomato yield?",
                        "What are organic pest control methods?",
                        "Which crops grow well in sandy soil?",
                        "Signs of nitrogen deficiency in plants?",
                        "How to prepare garden for winter?",
                      ].map((suggestion) => (
                        <Button
                          key={suggestion}
                          variant="outline"
                          className="text-sm justify-start h-auto py-2 px-3"
                          onClick={() => {
                            setInput(suggestion);
                          }}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={cn(
                          "flex items-start gap-2 max-w-[85%]",
                          message.role === "user" ? "ml-auto" : "mr-auto"
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0",
                            message.role === "user"
                              ? "bg-primary text-primary-foreground order-2"
                              : "bg-muted text-foreground"
                          )}
                        >
                          {message.role === "user" ? (
                            <User className="h-5 w-5" />
                          ) : (
                            <Bot className="h-5 w-5" />
                          )}
                        </div>
                        <div
                          className={cn(
                            "rounded-lg p-3",
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          )}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex items-start gap-2 max-w-[85%]">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-foreground flex-shrink-0">
                          <Bot className="h-5 w-5" />
                        </div>
                        <div className="rounded-lg p-3 bg-muted text-foreground">
                          <Loader2 className="h-5 w-5 animate-spin" />
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                )}
              </div>

              {/* Input area */}
              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Ask a farming question..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[60px] flex-1 resize-none"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button
                    size="icon"
                    className="h-[60px] w-[60px]"
                    onClick={handleSendMessage}
                    disabled={!input.trim() || isLoading}
                  >
                    {isLoading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Send className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground mt-2">
                  Agrislove AI Assistant provides general farming guidance. For critical crop decisions, consult with local agricultural experts.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
