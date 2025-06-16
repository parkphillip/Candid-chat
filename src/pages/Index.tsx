
import { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { generateLarryAgranResponse } from '@/utils/openai';

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
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const aiResponse = await generateLarryAgranResponse(currentInput);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble responding right now. This might be a temporary technical issue. Please try again in a moment.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header with Larry's Profile - Always Visible */}
      <div className="flex-shrink-0 border-b border-gray-200 bg-white px-4 py-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center space-y-4">
          <div className="relative group">
            <img 
              src="/lovable-uploads/7e5de62c-eeaf-4163-a0ae-193baf2eafda.png"
              alt="Larry Agran"
              className="w-20 h-20 rounded-full object-cover transition-all duration-300 group-hover:scale-105"
              style={{
                filter: 'contrast(1.1) brightness(1.05)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)'
              }}
            />
          </div>
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Larry Agran</h1>
            <p className="text-gray-600 text-sm">Former Mayor of Irvine • Environmental Advocate</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-8">
                Ask about sustainable development, local governance, environmental policy, or my experience in public service.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <p className="text-sm text-gray-700">What are your views on sustainable urban development?</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <p className="text-sm text-gray-700">How did you approach environmental policy as mayor?</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <p className="text-sm text-gray-700">What role should local government play in climate action?</p>
                </div>
                <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <p className="text-sm text-gray-700">Tell me about participatory democracy in Irvine.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start space-x-3 max-w-[80%]">
                    {!message.isUser && (
                      <img 
                        src="/lovable-uploads/7e5de62c-eeaf-4163-a0ae-193baf2eafda.png"
                        alt="Larry Agran"
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
                        style={{
                          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    )}
                    <div
                      className={`px-4 py-3 rounded-2xl ${
                        message.isUser
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900 border border-gray-200'
                      }`}
                      style={{
                        boxShadow: message.isUser 
                          ? '0 2px 12px rgba(59, 130, 246, 0.15)' 
                          : '0 2px 8px rgba(0, 0, 0, 0.04)'
                      }}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <img 
                      src="/lovable-uploads/7e5de62c-eeaf-4163-a0ae-193baf2eafda.png"
                      alt="Larry Agran"
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-1"
                      style={{
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <div className="bg-gray-100 border border-gray-200 px-4 py-3 rounded-2xl">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area - Always Visible */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white px-4 py-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Message Larry Agran..."
                className="w-full bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3 text-sm resize-none"
                style={{
                  boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
                }}
                disabled={isTyping}
              />
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-3 rounded-xl transition-all duration-200 hover:shadow-lg disabled:hover:shadow-none"
            >
              <Send size={16} />
            </Button>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Powered by Candid - AI Political Discourse Platform
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
