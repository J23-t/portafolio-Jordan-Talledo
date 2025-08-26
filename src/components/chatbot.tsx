"use client";

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { projectConsultant, type ProjectConsultantOutput } from '@/ai/flows/project-consultant';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2, User, Send, MessageSquareQuote, X } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

interface DisplayMessage {
    role: 'user' | 'assistant';
    content: string;
}

export function ChatBot() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [conversation, setConversation] = useState<DisplayMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitiated, setIsInitiated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const FormSchema = z.object({
    prompt: z.string().min(1, { message: "El mensaje no puede estar vacío." }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { prompt: "" },
  });

  const initiateConversation = async () => {
    if (!isInitiated) {
      setIsLoading(true);
      setIsInitiated(true);
      try {
        const result: ProjectConsultantOutput = await projectConsultant({ history: [], language });
        if (result && result.reply) {
          setConversation(prev => [...prev, { role: 'assistant', content: result.reply }]);
        }
      } catch (error) {
        console.error(error);
        toast({
          title: t.summarizer.error.title,
          description: t.summarizer.error.description,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [conversation]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    
    const userMessage: DisplayMessage = { role: 'user', content: data.prompt };
    const currentConversation: DisplayMessage[] = [...conversation, userMessage];
    setConversation(currentConversation);
    form.reset();

    try {
        const result: ProjectConsultantOutput = await projectConsultant({
            history: currentConversation,
            language
        });
      
      if (result && result.reply) {
        setConversation(prev => [...prev, { role: 'assistant', content: result.reply }]);
      }

    } catch (error) {
      console.error(error);
      toast({
        title: t.summarizer.error.title,
        description: t.summarizer.error.description,
        variant: "destructive",
      });
      setConversation(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }

  const handleContact = () => {
    setIsOpen(false);
    const conversationText = conversation.map(m => `${m.role === 'user' ? 'Cliente' : 'Asistente'}: ${m.content}`).join('\n\n');
    const contactSection = document.getElementById('contact');
    const contactTextarea = contactSection?.querySelector('textarea[name="message"]');
    if (contactTextarea instanceof HTMLTextAreaElement) {
        contactTextarea.value = `El cliente tuvo la siguiente conversación con el asistente de IA:\n\n---\n\n${conversationText}`;
        contactTextarea.dispatchEvent(new Event('input', { bubbles: true }));

        const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement;
        if (nameInput) nameInput.focus();
        else contactSection?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (open && !isInitiated) {
        initiateConversation();
      }
    }}>
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
        className="w-[calc(100vw-32px)] sm:w-[400px] h-[600px] p-0 z-50 mr-2 mb-2"
        sideOffset={16}
      >
        <Card className="flex flex-col h-full w-full border-none">
          <CardHeader>
            <CardTitle className="font-headline">{t.summarizer.output.title}</CardTitle>
            <CardDescription>{t.summarizer.output.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col p-4 pt-0">
            <ScrollArea className="flex-grow pr-4 -mr-4" ref={scrollAreaRef}>
              <div className="space-y-6">
                {conversation.length === 0 && !isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground pt-12">
                    <Bot className="h-12 w-12 mb-4" />
                    <p>{t.summarizer.output.placeholder}</p>
                  </div>
                ) : (
                  conversation.map((message, index) => (
                    <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                      {message.role === 'assistant' && (
                        <div className="p-2 rounded-full bg-primary/20 text-primary shrink-0">
                          <Bot className="h-5 w-5" />
                        </div>
                      )}
                      <div className={cn("max-w-[85%] p-3 rounded-lg", message.role === 'assistant' ? 'bg-muted' : 'bg-primary text-primary-foreground')}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {message.role === 'user' && (
                        <div className="p-2 rounded-full bg-muted text-muted-foreground shrink-0">
                          <User className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  ))
                )}
                {isLoading && conversation.length > 0 && conversation.at(-1)?.role === 'user' && (
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-full bg-primary/20 text-primary shrink-0">
                      <Bot className="h-6 w-6" />
                    </div>
                    <div className="max-w-[85%] p-4 rounded-lg bg-muted flex items-center">
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            <div className="mt-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-2">
                  <FormField
                    control={form.control}
                    name="prompt"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Textarea
                            placeholder={t.summarizer.input.placeholder}
                            className="resize-none"
                            rows={1}
                            {...field}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                if (!isLoading && form.getValues().prompt) {
                                  form.handleSubmit(onSubmit)();
                                }
                              }
                            }}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} size="icon" className="shrink-0">
                    <Send className="h-5 w-5" />
                    <span className="sr-only">{t.summarizer.button.submit}</span>
                  </Button>
                </form>
              </Form>
            </div>
            {conversation.length > 0 && !isLoading && conversation.some(m => m.content.includes("Jordan Talledo")) && (
              <div className="mt-4 text-center">
                <Button onClick={handleContact}>
                  <MessageSquareQuote className="mr-2 h-4 w-4" />
                  {t.summarizer.output.contactButton}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
