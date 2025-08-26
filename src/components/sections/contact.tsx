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
import { Mail, Phone, Send, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { sendContactEmail } from '@/ai/flows/send-contact-email';


export function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    try {
      const result = await sendContactEmail(values);
      console.log(result);
      toast({
        title: t.contact.form.success.title,
        description: t.contact.form.success.description,
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">{t.contact.title}</h2>
          <p className="text-muted-foreground mt-2">{t.contact.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{t.contact.form.title}</CardTitle>
                    <CardDescription>{t.contact.form.description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem><FormLabel>{t.contact.form.name}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>{t.contact.form.email}</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem><FormLabel>{t.contact.form.phone}</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="message" render={({ field }) => (
                                <FormItem><FormLabel>{t.contact.form.message}</FormLabel><FormControl><Textarea rows={5} {...field} /></FormControl><FormMessage /></FormItem>
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
                </CardContent>
            </Card>
            <div className="space-y-6 flex flex-col justify-center">
                <h3 className="font-headline text-2xl font-bold">{t.contact.direct.title}</h3>
                <p className="text-muted-foreground">{t.contact.direct.description}</p>
                <div className="space-y-4">
                    <Button asChild variant="outline" size="lg" className="w-full justify-start text-left">
                        <a href={`mailto:${t.social.email}`}>
                            <Mail className="mr-4 h-6 w-6 text-primary" />
                            <div className="flex flex-col">
                                <span>{t.social.email}</span>
                                <span className="text-xs text-muted-foreground">{t.language === 'es' ? 'Correo Electrónico' : 'Email'}</span>
                            </div>
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="w-full justify-start text-left">
                         <a href={`tel:${t.social.phone}`}>
                            <Phone className="mr-4 h-6 w-6 text-primary" />
                            <div className="flex flex-col">
                                <span>{t.social.phone}</span>
                                <span className="text-xs text-muted-foreground">{t.language === 'es' ? 'Teléfono' : 'Phone'}</span>
                            </div>
                        </a>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
