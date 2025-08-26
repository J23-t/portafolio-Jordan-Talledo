
"use client";

import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { Service } from '@/lib/types';
import * as React from 'react';

export function Services() {
  const { t } = useLanguage();
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <section id="services" className="py-16 md:py-24 bg-background animate-slide-in-from-bottom-blur">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">{t.services.title}</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t.services.subtitle}</p>
        </div>
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
            slidesPerView: 1,
            breakpoints: {
                '(min-width: 640px)': { slidesPerView: 2 },
                '(min-width: 1024px)': { slidesPerView: 3 },
            },
          }}
          className="w-full max-w-6xl mx-auto"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {t.services.list.map((service: Service) => (
              <CarouselItem key={service.title}>
                 <div className="p-1 h-full">
                    <Card className="text-center h-full">
                        <CardHeader>
                            <div className="mx-auto mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                            <service.icon className="h-8 w-8" />
                            </div>
                            <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{service.description}</p>
                        </CardContent>
                    </Card>
                 </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
}
