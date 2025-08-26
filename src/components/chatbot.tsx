
"use client";

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, X, Send, Mail, Phone } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Link from 'next/link';

export function ChatBot() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const handleGoToContact = () => {
    setIsOpen(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
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
        <Card className="border-none">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Bot className="h-6 w-6" />
              {t.language === 'es' ? 'Asistente de Contacto' : 'Contact Assistant'}
            </CardTitle>
            <CardDescription>{t.language === 'es' ? '¿Cómo prefieres contactar a Jordan?' : 'How would you like to contact Jordan?'}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4 p-4 pt-0">
            <Button onClick={handleGoToContact} size="lg">
              <Send className="mr-2" />
              {t.language === 'es' ? 'Ir al Formulario de Contacto' : 'Go to Contact Form'}
            </Button>
            <div className="space-y-2">
                 <Button asChild variant="outline" size="lg" className="w-full justify-start text-left h-auto py-2">
                    <a href={`mailto:${t.social.email}`}>
                        <Mail className="mr-4 h-6 w-6 text-primary" />
                        <div className="flex flex-col">
                            <span className="font-semibold">{t.social.email}</span>
                            <span className="text-xs text-muted-foreground">{t.language === 'es' ? 'Correo Electrónico' : 'Email'}</span>
                        </div>
                    </a>
                </Button>
                 <Button asChild variant="outline" size="lg" className="w-full justify-start text-left h-auto py-2">
                     <a href={`tel:${t.social.phone}`}>
                        <Phone className="mr-4 h-6 w-6 text-primary" />
                        <div className="flex flex-col">
                            <span className="font-semibold">{t.social.phone}</span>
                            <span className="text-xs text-muted-foreground">{t.language === 'es' ? 'Teléfono' : 'Phone'}</span>
                        </div>
                    </a>
                </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
