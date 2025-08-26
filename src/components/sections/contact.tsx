"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Mail, Phone, Send, Loader2, CheckCircle, RefreshCcw, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { sendContactEmail } from '@/ai/flows/send-contact-email';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ContactProps {
  setIsFormFocused: (isFocused: boolean) => void;
}

export function Contact({ setIsFormFocused }: ContactProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState('');

  const formSchema = z.object({
    name: z.string().min(2, { message: t.contact.form.validation.name }),
    email: z.string().email({ message: t.contact.form.validation.email }),
    phone: z.string().optional(),
    message: z.string().min(10, { message: t.contact.form.validation.message }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', phone: '', message: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setIsSuccess(false);

    try {
      const result = await sendContactEmail(values);

      if (result && result.success) {
        setIsSuccess(true);
        form.reset();
      } else {
        throw new Error(result.message || t.contact.form.error.description);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : t.contact.form.error.description;
      toast({
        title: t.contact.form.error.title,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleResetForm = () => {
    setIsSuccess(false);
    form.reset();
  };

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>, textToCopy: string, type: 'email' | 'phone') => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(textToCopy);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">{t.contact.title}</h2>
          <p className="text-muted-foreground mt-2">{t.contact.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
            <div
                onFocus={() => setIsFormFocused(true)}
                onBlur={() => setIsFormFocused(false)}
                className="relative z-20 transition-all duration-300"
            >
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">{t.contact.form.title}</CardTitle>
                        <CardDescription>{t.contact.form.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center text-center h-full min-h-[400px] space-y-4">
                                <CheckCircle className="h-16 w-16 text-green-500" />
                                <h3 className="text-2xl font-bold">{t.contact.form.success.title}</h3>
                                <p className="text-muted-foreground">{t.contact.form.success.description}</p>
                                <Button onClick={handleResetForm} variant="outline">
                                    <RefreshCcw className="mr-2 h-4 w-4" />
                                    {t.contact.form.success.resetButton}
                                </Button>
                            </div>
                        ) : (
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField control={form.control} name="name" render={({ field }) => (
                                        <FormItem><FormLabel>{t.contact.form.name}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )} />
                                    <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem><FormLabel>{t.contact.form.email}</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></Item>
                                    )} />
                                    <FormField control={form.control} name="phone" render={({ field }) => (
                                        <FormItem><FormLabel>{t.contact.form.phone}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></Item>
                                    )} />
                                    <FormField control={form.control} name="message" render={({ field }) => (
                                        <FormItem><FormLabel>{t.contact.form.message}</FormLabel><FormControl><Textarea rows={5} {...field} /></FormControl><FormMessage /></Item>
                                    )} />
                                    <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                {t.language === 'es' ? 'Enviando...' : 'Sending...'}
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-5 w-5" />
                                                {t.contact.form.submit}
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        )}
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-6 flex flex-col justify-center relative z-20">
                <h3 className="font-headline text-2xl font-bold">{t.contact.direct.title}</h3>
                <p className="text-muted-foreground">{t.contact.direct.description}</p>
                <div className="space-y-4">
                    <a href={`mailto:${t.social.email}`} className="relative block group">
                        <Button variant="outline" size="lg" className="w-full justify-start text-left h-auto py-4 pr-12">
                            <Mail className="mr-4 h-6 w-6 text-primary flex-shrink-0" />
                            <div className="flex-grow overflow-hidden">
                                <span className="block break-all">{t.social.email}</span>
                                <span className="text-xs text-muted-foreground">{t.language === 'es' ? 'Correo Electrónico' : 'Email'}</span>
                            </div>
                        </Button>
                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => handleCopy(e, t.social.email, 'email')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 ml-2 flex-shrink-0"
                        >
                            {copied === 'email' ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-muted-foreground" />}
                        </Button>
                    </a>
                    <a href={`tel:${t.social.phone}`} className="relative block group">
                        <Button variant="outline" size="lg" className="w-full justify-start text-left h-auto py-4 pr-12">
                            <Phone className="mr-4 h-6 w-6 text-primary flex-shrink-0" />
                            <div className="flex-grow overflow-hidden">
                                <span className="block">{t.social.phone}</span>
                                <span className="text-xs text-muted-foreground">{t.language === 'es' ? 'Teléfono' : 'Phone'}</span>
                            </div>
                        </Button>
                         <Button
                            size="icon"
                            variant="ghost"
                            onClick={(e) => handleCopy(e, t.social.phone, 'phone')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 ml-2 flex-shrink-0"
                        >
                            {copied === 'phone' ? <Check className="h-5 w-5 text-green-500" /> : <Copy className="h-5 w-5 text-muted-foreground" />}
                        </Button>
                    </a>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
