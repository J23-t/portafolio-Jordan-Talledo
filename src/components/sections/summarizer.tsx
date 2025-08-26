"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { summarizeContent, type SummarizeContentOutput } from '@/ai/flows/summarize-content';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bot, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export function Summarizer() {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [summary, setSummary] = useState<SummarizeContentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const FormSchema = z.object({
    content: z.string().min(1, { message: language === 'es' ? "El contenido no puede estar vacío." : "Content cannot be empty." }),
  });


  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { content: "" },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setSummary(null);
    try {
      const result = await summarizeContent({ content: data.content });
      setSummary(result);
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

  return (
    <section id="summarizer" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">{t.summarizer.title}</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t.summarizer.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="font-headline">{t.summarizer.input.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.summarizer.input.label}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t.summarizer.input.placeholder}
                            className="resize-y min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t.summarizer.button.loading}
                      </>
                    ) : (
                      <>
                        <Bot className="mr-2 h-4 w-4" />
                        {t.summarizer.button.submit}
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
          <Card className="flex flex-col bg-background">
            <CardHeader>
              <CardTitle className="font-headline">{t.summarizer.output.title}</CardTitle>
              <CardDescription>{t.summarizer.output.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {isLoading && (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              )}
              {summary ? (
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p>{summary.summary}</p>
                </div>
              ) : !isLoading && (
                 <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <Bot className="h-12 w-12 mb-4" />
                    <p>{t.summarizer.output.placeholder}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
