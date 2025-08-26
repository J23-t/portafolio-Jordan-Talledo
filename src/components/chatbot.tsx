
"use client";

import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { projectConsultant } from '@/ai/flows/project-consultant';
import { Avatar, AvatarFallback } from './ui/avatar';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export function ChatBot() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const initialMessage = {
    role: 'model' as const,
    content: t.language === 'es' 
      ? '¡Hola! Soy el asistente virtual de Jordan. ¿En qué tipo de proyecto estás pensando?' 
      : 'Hi! I\'m Jordan\'s virtual assistant. What kind of project are you thinking about?',
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [isOpen, messages.length, t.language]);


  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  const handleGoToContact = () => {
    setIsOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const history = newMessages.map(msg => ({ role: msg.role, content: msg.content }));
      const result = await projectConsultant({ history });
      
      if (result.response) {
        setMessages(prev => [...prev, { role: 'model', content: result.response }]);
      }

      // This handles the case where the AI calls a tool to send an email
      if (result.response.includes('Email sent successfully')) {
          toast({
              title: t.language === 'es' ? 'Correo Enviado' : 'Email Sent',
              description: t.language === 'es' ? 'Jordan ha recibido tu consulta. ¡Gracias!' : 'Jordan has received your inquiry. Thank you!',
          });
      }

    } catch (error) {
      console.error(error);
      const errorMessage = t.language === 'es' ? 'Lo siento, ocurrió un error. Por favor, intenta de nuevo o usa el formulario de contacto.' : 'I\'m sorry, an error occurred. Please try again or use the contact form.';
      setMessages(prev => [...prev, { role: 'model', content: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50"
        >
          {isOpen ? <X className="h-7 w-7"/> : <Bot className="h-7 w-7" />}
          <span className="sr-only">Toggle Chat</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-[calc(100vw-32px)] sm:w-[400px] p-0 z-50 mr-2 mb-2"
        sideOffset={16}
      >
        <Card className="border-none flex flex-col h-[500px]">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Bot className="h-6 w-6" />
              {t.language === 'es' ? 'Asistente de Proyectos' : 'Project Assistant'}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden p-4">
              <ScrollArea className="h-full" ref={scrollAreaRef}>
                 <div className="space-y-4 pr-4">
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={cn(
                          "flex items-start gap-3",
                          message.role === 'user' ? 'justify-end' : 'justify-start'
                        )}
                      >
                        {message.role === 'model' && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback><Bot /></AvatarFallback>
                          </Avatar>
                        )}
                        <div className={cn(
                          "p-3 rounded-lg max-w-[80%]",
                           message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        )}>
                            <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                       <div className="flex items-start gap-3 justify-start">
                           <Avatar className="h-8 w-8">
                                <AvatarFallback><Bot /></AvatarFallback>
                            </Avatar>
                            <div className="p-3 rounded-lg bg-muted flex items-center space-x-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm text-muted-foreground">{t.language === 'es' ? 'Pensando...' : 'Thinking...'}</span>
                            </div>
                       </div>
                    )}
                 </div>
              </ScrollArea>
          </CardContent>
          <CardFooter className="p-4 border-t">
             <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t.language === 'es' ? 'Escribe tu idea...' : 'Type your idea...'}
                    disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                    {isLoading ? <Loader2 className="h-5 w-5 animate-spin"/> : <Send className="h-5 w-5" />}
                    <span className="sr-only">Send</span>
                </Button>
             </form>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
