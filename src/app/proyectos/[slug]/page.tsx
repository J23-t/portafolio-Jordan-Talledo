
"use client";

import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import ProjectDetailClient from './project-detail-client';

type Props = {
  params: { slug: string }
}

export default function ProjectDetailPage({ params }: Props) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
