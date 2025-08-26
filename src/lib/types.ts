import type { LucideIcon } from 'lucide-react';

export interface Skill {
  name: string;
  icon: LucideIcon;
}

export interface Service {
    title: string;
    description: string;
    icon: LucideIcon;
}

export interface Project {
    title: string;
    description: string;
    description_es: string;
    description_en: string;
    technologies: string[];
    imageUrl: string;
    link: string;
    category: 'web' | 'mobile';
}

export interface Testimonial {
    quote: string;
    name: string;
    company: string;
    avatar: string;
}

export interface Content {
    nav: {
        about: string;
        services: string;
        projects: string;
        contact: string;
    };
    hero: {
        title: string;
        subtitle: string;
        imageAlt: string;
        ctaContact: string;
        ctaProjects: string;
    };
    about: {
        title: string;
        bio: string;
        imageAlt: string;
        cv: {
            label: string;
            url: string;
        };
        skills: {
            title: string;
            list: Skill[];
        }
    };
    services: {
        title: string;
        subtitle: string;
        list: Service[];
    };
    projects: {
        title: string;
        subtitle: string;
        filters: {
            all: string;
            mobile: string;
            web: string;
        };
        list: Project[];
    };
    summarizer: {
        title: string;
        subtitle: string;
        input: {
            title: string;
            label: string;
            placeholder: string;
        };
        output: {
            title: string;
            description: string;
            placeholder: string;
        };
        button: {
            submit: string;
            loading: string;
        };
        error: {
            title: string;
            description: string;
        };
    };
    scheduling: {
        title: string;
        subtitle: string;
        buttonText: string;
        calendlyUrl: string;
    };
    testimonials: {
        title: string;
        subtitle: string;
        list: Testimonial[];
    },
    contact: {
        title: string;
        subtitle: string;
        form: {
            title: string;
            description: string;
            name: string;
            email: string;
            phone: string;
            message: string;
            submit: string;
            success: {
                title: string;
                description: string;
            },
            validation: {
                name: string;
                email: string;
                message: string;
            }
        },
        direct: {
            title: string;
            description: string;
        }
    };
    social: {
        github: string;
        linkedin: string;
        twitter: string;
    };
    footer: {
        copyright: string;
    };
}

export interface ContentData {
  es: Content;
  en: Content;
}
