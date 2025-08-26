"use client";

import { useState } from 'react';
import { Bot, X, Send, Loader2, Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { useLanguage } from '@/contexts/language-context';
import { projectConsultant } from '@/ai/flows/project-consultant';
import { ScrollArea } from './ui/scroll-area';
import { Avatar, AvatarFallback } from './ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      // First time opening the chat
      setIsLoading(true);
      projectConsultant({ history: [] })
        .then(response => {
          setMessages([{ role: 'model', content: response.response }]);
        })
        .catch(error => {
            console.error("Failed to get initial message:", error);
            setMessages([{ role: 'model', content: "Lo siento, estoy teniendo problemas para conectarme. Por favor, inténtalo de nuevo más tarde." }]);
        })
        .finally(() => setIsLoading(false));
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await projectConsultant({ history: newMessages.map(m => ({role: m.role, content: m.content})) });
      setMessages([...newMessages, { role: 'model', content: response.response }]);
    } catch (error) {
      console.error("Failed to get response:", error);
      setMessages([...newMessages, { role: 'model', content: "Lo siento, ocurrió un error. Por favor, intenta de nuevo." }]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <Button
        onClick={handleToggle}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-50"
      >
        {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
      </Button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm">
          <Card className="flex flex-col h-[60vh] shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Bot className="text-primary" />
                {t.language === 'es' ? 'Asistente de Proyectos' : 'Project Assistant'}
              </CardTitle>
              <CardDescription>
                {t.language === 'es' ? 'Puedo ayudarte a definir los requisitos de tu proyecto.' : 'I can help you define your project requirements.'}
              </CardDescription>
            </CardHeader>
            <ScrollArea className="flex-grow p-4">
               <div className="space-y-4">
                {messages.map((message, index) => (
                    <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                        {message.role === 'model' && (
                            <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                                <AvatarFallback><Bot size={20}/></AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn("max-w-[80%] rounded-xl p-3 text-sm", 
                            message.role === 'user' 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted"
                        )}>
                            <p>{message.content}</p>
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex justify-start gap-3">
                         <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                            <AvatarFallback><Bot size={20}/></AvatarFallback>
                        </Avatar>
                        <div className="bg-muted rounded-xl p-3">
                            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                )}
              </div>
            </ScrollArea>
            <CardContent className="border-t pt-6">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={t.language === 'es' ? 'Escribe tu mensaje...' : 'Type your message...'}
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        <Send className="h-5 w-5" />
                    </Button>
                </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
