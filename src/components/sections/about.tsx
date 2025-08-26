"use client";

import Image from 'next/image';
import * as React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Skill } from '@/lib/types';
import Autoplay from "embla-carousel-autoplay";

export function About() {
  const { t, language } = useLanguage();
  
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <section id="about" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-primary">
              <Image
                src="/fotodeperfil.PNG"
                alt={t.about.imageAlt}
                fill
                className="object-cover object-center"
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
            <Carousel
              plugins={[plugin.current]}
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-6xl mx-auto"
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {t.about.skills.list.map((skill: Skill) => (
                  <CarouselItem key={skill.name} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 p-2">
                     <Dialog>
                      <DialogTrigger asChild>
                        <Card className="text-center p-4 transition-transform hover:scale-105 bg-background cursor-pointer h-full">
                          <CardContent className="flex flex-col items-center justify-center gap-2 h-full p-0">
                            <skill.icon className="h-10 w-10 text-primary" />
                            <span className="font-semibold text-sm">{skill.name}</span>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3 font-headline text-2xl">
                            <skill.icon className="h-8 w-8 text-primary" />
                            {skill.name}
                          </DialogTitle>
                          <DialogDescription className="pt-4 text-base">
                            {language === 'es' ? skill.description_es : skill.description_en}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </Carousel>
        </div>
      </div>
    </section>
  );
}
