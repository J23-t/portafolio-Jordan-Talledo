
import { notFound } from 'next/navigation';
import { projects } from '@/lib/data';
import ProjectDetailClient from './project-detail-client';
import type { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${project.title} | Jordan Talledo`,
    description: project.description_es, // Using Spanish as the primary description for SEO
    openGraph: {
      title: `${project.title} | Jordan Talledo`,
      description: project.description_es,
      images: [
        {
            url: project.imageUrl,
            width: 1200,
            height: 630,
            alt: project.title,
        },
        ...previousImages
      ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${project.title} | Jordan Talledo`,
        description: project.description_es,
        images: [project.imageUrl],
    }
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const { slug } = params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
