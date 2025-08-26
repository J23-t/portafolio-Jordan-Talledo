
"use client";

import { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { ProjectCard } from '../project-card';
import { Button } from '../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';
import * as React from 'react';

type Filter = 'all' | 'mobile' | 'web';

export function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const filteredProjects = t.projects.list.filter((project: Project) => {
    if (filter === 'all') return true;
    return project.category === filter;
  });

  const filters = [
    { label: t.projects.filters.all, value: 'all' as Filter },
    { label: t.projects.filters.mobile, value: 'mobile' as Filter },
    { label: t.projects.filters.web, value: 'web' as Filter },
  ];

  return (
    <section id="projects" className="py-16 md:py-24 bg-background animate-slide-in-from-bottom-blur">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">{t.projects.title}</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t.projects.subtitle}</p>
        </div>
        <div className="flex justify-center gap-2 mb-8">
          {filters.map((f) => (
            <Button
              key={f.value}
              variant={filter === f.value ? 'default' : 'outline'}
              onClick={() => setFilter(f.value)}
              className={cn(
                'transition-all',
                filter === f.value && 'bg-primary text-primary-foreground'
              )}
            >
              {f.label}
            </Button>
          ))}
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
            {filteredProjects.map((project: Project, index: number) => (
              <CarouselItem key={index}>
                <div className="p-1 h-full">
                    <ProjectCard project={project} />
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
