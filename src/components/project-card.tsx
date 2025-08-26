"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import { Eye } from 'lucide-react';
import type { Project } from '@/lib/types';
import { useLanguage } from '@/contexts/language-context';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { language } = useLanguage();
  const description = language === 'es' ? project.description_es : project.description_en;

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 bg-secondary/50">
      <Link href={`/proyectos/${project.slug}`} className="aspect-video relative bg-muted block">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          className="object-cover"
          data-ai-hint="project screenshot"
        />
      </Link>
      <CardHeader>
        <CardTitle className="font-headline text-xl text-primary">
          <Link href={`/proyectos/${project.slug}`}>{project.title}</Link>
        </CardTitle>
        <CardDescription className="text-card-foreground/80 line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col flex-grow justify-between gap-4">
        <div>
          <p className="text-sm font-medium mb-2 text-muted-foreground">{language === 'es' ? 'Tecnologías:' : 'Technologies:'}</p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
          </div>
        </div>
        <Button asChild className="w-full mt-auto">
          <Link href={`/proyectos/${project.slug}`}>
            <Eye className="mr-2 h-4 w-4" /> 
            {language === 'es' ? 'Ver detalles' : 'View details'}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
