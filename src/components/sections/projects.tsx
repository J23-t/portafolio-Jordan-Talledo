"use client";

import { useState } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { ProjectCard } from '../project-card';
import { Button } from '../ui/button';
import type { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'mobile' | 'web';

export function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<Filter>('all');

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project: Project, index: number) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
