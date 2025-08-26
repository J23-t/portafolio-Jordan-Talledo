
import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import { content } from '@/lib/content';
import { Metadata, ResolvingMetadata } from 'next';
import ProjectDetailClient from './project-detail-client';

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  const projectDescription = content.es.projects.list.find(p => p.slug === slug)?.description_es || project.description_en;
  
  // Optionally access parent metadata
  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${project.title} | Jordan Talledo Projects`,
    description: projectDescription,
    openGraph: {
      title: `${project.title} | Jordan Talledo`,
      description: projectDescription,
      images: [project.imageUrl, ...previousImages],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Jordan Talledo`,
      description: projectDescription,
      images: [project.imageUrl],
    },
  }
}

export default function ProjectDetailPage({ params }: Props) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
