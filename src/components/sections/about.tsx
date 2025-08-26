
"use client";

import Image from 'next/image';
import * as React from 'react';
import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';
import { Download, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Project, Skill } from '@/lib/types';
import { Badge } from '../ui/badge';


export function About() {
  const { t, language } = useLanguage();
  
  return (
    <section id="about" className="py-16 md:py-24 bg-secondary animate-fade-in-up">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {t.about.skills.list.map((skill: Skill) => {
                  const projectsWithSkill = t.projects.list.filter((project: Project) => 
                    project.technologies.includes(skill.name)
                  );

                  return (
                    <Dialog key={skill.name}>
                      <DialogTrigger asChild>
                        <Card className="text-center p-4 transition-transform hover:scale-105 bg-background cursor-pointer h-full">
                          <CardContent className="flex flex-col items-center justify-center gap-2 h-full p-0">
                            <skill.icon className="h-10 w-10 text-primary" />
                            <span className="font-semibold text-sm">{skill.name}</span>
                          </CardContent>
                        </Card>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-3 font-headline text-2xl">
                            <skill.icon className="h-8 w-8 text-primary" />
                            {skill.name}
                          </DialogTitle>
                          <DialogDescription className="pt-4 text-base text-left">
                            {language === 'es' ? skill.description_es : skill.description_en}
                          </DialogDescription>
                        </DialogHeader>
                        {projectsWithSkill.length > 0 && (
                          <div className="mt-4">
                            <h4 className="font-semibold mb-3 text-lg">{language === 'es' ? 'Proyectos Relevantes' : 'Relevant Projects'}</h4>
                            <div className="space-y-2">
                              {projectsWithSkill.map((project: Project) => (
                                <a
                                  key={project.title}
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between p-2 rounded-md bg-secondary hover:bg-secondary/80 transition-colors"
                                >
                                  <span>{project.title}</span>
                                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                                </a>
                              ))}
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  );
                })}
              </div>
        </div>
      </div>
    </section>
  );
}
