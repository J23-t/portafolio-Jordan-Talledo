"use client";

import { useLanguage } from '@/contexts/language-context';
import { Button } from '../ui/button';
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function Scheduling() {
  const { t } = useLanguage();
  return (
    <section id="scheduling" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-3xl mx-auto text-center">
            <CardHeader>
                <div className="mx-auto bg-primary text-primary-foreground rounded-full p-3 w-fit mb-4">
                    <Calendar className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-3xl font-bold">{t.scheduling.title}</CardTitle>
                <CardDescription className="text-muted-foreground mt-2 text-lg">{t.scheduling.subtitle}</CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" asChild className="bg-accent hover:bg-accent/90">
                    <a href={t.scheduling.calendlyUrl} target="_blank" rel="noopener noreferrer">
                        {t.scheduling.buttonText}
                    </a>
                </Button>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
