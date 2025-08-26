"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, ExternalLink } from 'lucide-react';
import type { Project } from '@/lib/types';

interface ProjectDetailClientProps {
    project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const { t, language } = useLanguage();

  const description = language === 'es' ? project.description_es : project.description_en;

  return (
    <div className="animate-fade-in">
        <div className="container mx-auto px-4 md:px-6 py-8">
            <nav className="flex items-center text-sm text-muted-foreground mb-8">
                <Link href="/" className="hover:text-primary transition-colors">
                    Home
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link href="/#projects" className="hover:text-primary transition-colors">
                    {t.nav.projects}
                </Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span className="font-medium text-foreground">{project.title}</span>
            </nav>

            <article className="max-w-4xl mx-auto">
                <header className="mb-8">
                    <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
                        {project.title}
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        {description}
                    </p>
                </header>
                
                <div className="aspect-video relative rounded-lg overflow-hidden shadow-lg mb-8 bg-muted">
                    <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover"
                        data-ai-hint="project screenshot"
                        priority
                    />
                </div>

                <div className="bg-secondary/50 p-6 rounded-lg mb-8">
                    <h3 className="font-headline text-2xl font-semibold mb-4">{language === 'es' ? 'Tecnologías Utilizadas' : 'Technologies Used'}</h3>
                    <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech) => (
                        <Badge key={tech} variant="default" className="text-lg py-1 px-4 rounded-full">
                            {tech}
                        </Badge>
                    ))}
                    </div>
                </div>

                <div className="text-center">
                    <Button asChild size="lg">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="mr-2 h-5 w-5" />
                            {language === 'es' ? 'Visitar el Sitio Web' : 'Visit Website'}
                        </a>
                    </Button>
                </div>
            </article>

        </div>
    </div>
  );
}
