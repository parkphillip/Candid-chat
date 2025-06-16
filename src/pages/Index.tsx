
import { useState, useRef, useEffect } from 'react';
import { Send, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I appreciate your question about policy matters. Let me share my perspective on this issue based on my experience in public service...",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-slate-900 text-slate-100 flex">
      {/* Left Panel - Politician Profile */}
      <div className="w-1/3 bg-slate-800 border-r border-slate-700 flex flex-col items-center justify-center p-8 animate-fade-in">
        <div className="text-center">
          <div className="w-48 h-48 bg-slate-700 rounded-full mb-6 flex items-center justify-center animate-scale-in">
            <User size={80} className="text-slate-400" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-200 mb-2">Senator Jane Smith</h1>
          <p className="text-slate-400 mb-4">D-California</p>
          <div className="bg-slate-700/50 rounded-lg p-4 text-sm text-slate-300">
            <p className="mb-2"><strong>Experience:</strong> 12 years in Senate</p>
            <p className="mb-2"><strong>Focus Areas:</strong> Healthcare, Climate Policy</p>
            <p><strong>Communication Style:</strong> Direct, data-driven, collaborative</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Chat Interface */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-slate-800 border-b border-slate-700 p-4 animate-fade-in">
          <h2 className="text-lg font-medium text-slate-200">Conversation with Senator Smith</h2>
          <p className="text-sm text-slate-400">Ask about policy positions, legislative experience, or current issues</p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 && (
            <div className="text-center text-slate-400 mt-12 animate-fade-in">
              <p className="text-lg mb-2">Welcome to Candid</p>
              <p>Start a conversation about policy, governance, or current issues</p>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}
            >
              <div
                className={`max-w-[70%] p-4 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-200'
                }`}
              >
                <p className="leading-relaxed">{message.content}</p>
                <p className="text-xs opacity-70 mt-2">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-slate-700 text-slate-200 p-4 rounded-lg max-w-[70%]">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  <span className="text-sm text-slate-400 ml-2">Senator Smith is responding...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-slate-800 border-t border-slate-700 p-4 animate-slide-up">
          <div className="flex space-x-2">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about policy positions, legislative priorities, or current issues..."
              className="flex-1 bg-slate-700 border-slate-600 text-slate-200 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 transition-all duration-200 hover:scale-105"
            >
              <Send size={18} />
            </Button>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">
            Responses simulate the politician's documented communication style and policy positions
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
