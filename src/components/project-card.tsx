"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import { ExternalLink, Eye } from 'lucide-react';
import type { Project } from '@/lib/types';
import { useLanguage } from '@/contexts/language-context';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { language, t } = useLanguage();
  const description = language === 'es' ? project.description_es : project.description_en;

  return (
    <Dialog>
      <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 bg-secondary/50">
        <div className="aspect-video relative">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            data-ai-hint="project screenshot"
          />
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-xl text-primary">{project.title}</CardTitle>
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
          <DialogTrigger asChild>
            <Button className="w-full mt-auto">
              <Eye className="mr-2 h-4 w-4" /> 
              {language === 'es' ? 'Ver detalles' : 'View details'}
            </Button>
          </DialogTrigger>
        </CardContent>
      </Card>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">{project.title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="aspect-video relative rounded-lg overflow-hidden">
             <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              data-ai-hint="project screenshot"
            />
          </div>
           <div>
            <h4 className="font-semibold mb-2">{language === 'es' ? 'Tecnologías Utilizadas' : 'Technologies Used'}</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button asChild>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              {language === 'es' ? 'Visitar sitio web' : 'Visit website'}
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
