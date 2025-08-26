"use client";

import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { Skill } from '@/lib/types';

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-primary">
              <Image
                src="https://picsum.photos/400/400"
                alt={t.about.imageAlt}
                fill
                className="object-cover"
                data-ai-hint="developer portrait"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">{t.about.title}</h2>
            <p className="text-muted-foreground leading-relaxed">{t.about.bio}</p>
            <Button asChild size="lg">
              <a href={t.about.cv.url} download>
                <Download className="mr-2 h-5 w-5" />
                {t.about.cv.label}
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-16">
            <h3 className="font-headline text-2xl md:text-3xl font-bold text-center mb-8">{t.about.skills.title}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {t.about.skills.list.map((skill: Skill) => (
                <Card key={skill.name} className="text-center p-4 transition-transform hover:scale-105">
                  <CardContent className="flex flex-col items-center justify-center gap-2">
                    <skill.icon className="h-10 w-10 text-primary" />
                    <span className="font-semibold">{skill.name}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}
