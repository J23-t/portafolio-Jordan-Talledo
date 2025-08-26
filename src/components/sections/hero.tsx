"use client";

import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
             <Image
                src="https://picsum.photos/1920/1080"
                alt={t.hero.imageAlt}
                fill
                className="object-cover"
                priority
                data-ai-hint="abstract technology"
            />
            <div className="absolute inset-0 bg-black/60"></div>
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center space-y-6">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
                {t.hero.title}
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-primary-foreground/80">
                {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="#contact">{t.hero.ctaContact}</Link>
                </Button>
                <Button size="lg" variant="secondary" asChild>
                    <Link href="#projects">
                        {t.hero.ctaProjects} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    </section>
  );
}
