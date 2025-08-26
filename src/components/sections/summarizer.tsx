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
import { Bot, Loader2, User, Send, MessageSquareQuote } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

interface ChatPart {
    text?: string;
    toolRequest?: any;
    toolResponse?: any;
}
interface ChatMessage {
    role: 'user' | 'model' | 'tool';
    parts: ChatPart[];
}
interface DisplayMessage {
    role: 'user' | 'assistant';
    content: string;
}

export function Summarizer() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [conversation, setConversation] = useState<ChatMessage[]>([]);
  const [displayConversation, setDisplayConversation] = useState<DisplayMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const FormSchema = z.object({
    prompt: z.string().min(1, { message: "El mensaje no puede estar vacío." }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { prompt: "" },
  });

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [displayConversation]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const userMessage: ChatMessage = { role: 'user', parts: [{ text: data.prompt }]};
    const currentConversation = [...conversation, userMessage];

    setConversation(currentConversation);
    setDisplayConversation(prev => [...prev, { role: 'user', content: data.prompt }]);
    form.reset();

    try {
        const historyForApi = currentConversation.map(m => ({
            role: m.role === 'assistant' ? 'model' : m.role,
            parts: m.parts.map(p => ({text: p.text ?? ''}))
        })).filter(m => m.role !== 'tool');

        const result: ProjectConsultantOutput = await projectConsultant({ 
            history: historyForApi
        });

      const assistantMessage: ChatMessage = { role: 'model', parts: [{ text: result.reply }] };
      setConversation([...currentConversation, assistantMessage]);
      setDisplayConversation(prev => [...prev, { role: 'assistant', content: result.reply }]);

    } catch (error) {
      console.error(error);
      toast({
        title: t.summarizer.error.title,
        description: t.summarizer.error.description,
        variant: "destructive",
      });
      // remove the user message if the call fails
      setConversation(currentConversation.slice(0, -1));
      setDisplayConversation(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }

  const handleContact = () => {
    const conversationText = displayConversation.map(m => `${m.role === 'user' ? 'Cliente' : 'Asistente'}: ${m.content}`).join('\n\n');
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
    <section id="summarizer" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">{t.summarizer.title}</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t.summarizer.subtitle}</p>
        </div>
        <Card className="max-w-3xl mx-auto bg-background">
            <CardHeader>
                <CardTitle className="font-headline">{t.summarizer.output.title}</CardTitle>
                <CardDescription>{t.summarizer.output.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-96 pr-4" ref={scrollAreaRef}>
                    <div className="space-y-6">
                        {displayConversation.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground pt-12">
                                <Bot className="h-12 w-12 mb-4" />
                                <p>{t.summarizer.output.placeholder}</p>
                            </div>
                        ) : (
                            displayConversation.map((message, index) => (
                                <div key={index} className={cn("flex items-start gap-4", message.role === 'user' ? 'justify-end' : '')}>
                                    {message.role === 'assistant' && (
                                        <div className="p-2 rounded-full bg-primary/20 text-primary shrink-0">
                                            <Bot className="h-6 w-6" />
                                        </div>
                                    )}
                                    <div className={cn("max-w-[85%] p-4 rounded-lg", message.role === 'assistant' ? 'bg-muted' : 'bg-primary text-primary-foreground')}>
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                    {message.role === 'user' && (
                                        <div className="p-2 rounded-full bg-muted text-muted-foreground shrink-0">
                                            <User className="h-6 w-6" />
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                         {isLoading && (
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

                <div className="mt-6">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start gap-4">
                            <FormField
                                control={form.control}
                                name="prompt"
                                render={({ field }) => (
                                    <FormItem className="flex-grow">
                                    <FormControl>
                                        <Textarea
                                            placeholder={t.summarizer.input.placeholder}
                                            className="resize-none"
                                            rows={2}
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
                            <Button type="submit" disabled={isLoading} size="icon" className="h-full px-4">
                               <Send className="h-5 w-5" />
                               <span className="sr-only">{t.summarizer.button.submit}</span>
                            </Button>
                        </form>
                    </Form>
                </div>

                {displayConversation.length > 0 && !isLoading && !displayConversation.at(-1)?.content.includes('Jordan') && (
                    <div className="mt-6 text-center">
                        <Button onClick={handleContact}>
                            <MessageSquareQuote className="mr-2 h-4 w-4" />
                            {t.summarizer.output.contactButton}
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
