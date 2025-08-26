"use client";

import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote, UserCircle } from 'lucide-react';
import type { Testimonial } from '@/lib/types';
import React from 'react';

export function Testimonials() {
  const { t, language } = useLanguage();

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-secondary animate-fade-in-up">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">{t.testimonials.title}</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t.testimonials.subtitle}</p>
        </div>
        
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: t.testimonials.list.length > 1,
          }}
          className="w-full max-w-4xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {t.testimonials.list.map((testimonial: Testimonial, index: number) => {
              const quote = language === 'es' ? testimonial.quote_es : testimonial.quote_en;
              const company = language === 'es' ? testimonial.company_es : testimonial.company_en;

              return (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="bg-background/50 border-border/50">
                      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                        <Quote className="w-12 h-12 text-primary/50 mb-4" />
                        <p className="text-lg md:text-xl italic mb-6">"{quote}"</p>
                        <div className="flex items-center gap-4">
                           <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-transparent">
                                    <UserCircle className="h-full w-full text-primary" />
                                </AvatarFallback>
                            </Avatar>
                          <div>
                            <p className="font-semibold text-primary">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{company}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          {t.testimonials.list.length > 1 && (
            <>
              <CarouselPrevious className="hidden md:flex" />
              <CarouselNext className="hidden md:flex" />
            </>
          )}
        </Carousel>
      </div>
    </section>
  );
}
