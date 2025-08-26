import type { ContentData } from './types';
import { projects, skills, testimonials } from './data';
import { Code, Cog, Server, Smartphone } from 'lucide-react';

export const content: ContentData = {
  es: {
    language: 'es',
    nav: {
        about: 'Sobre mí',
        services: 'Servicios',
        projects: 'Proyectos',
        contact: 'Contacto',
    },
    hero: {
        title: 'Jordan Enrique Talledo Salazar',
        subtitle: 'Desarrollador de Aplicaciones Móviles y Sitios Web. Innovación, código limpio y soluciones tecnológicas personalizadas.',
        imageAlt: 'Imagen de un desarrollador trabajando en su laptop',
        ctaContact: 'Contáctame',
        ctaProjects: 'Ver Proyectos',
    },
    about: {
        title: 'Sobre Mí',
        bio: 'Soy un desarrollador de software con una sólida trayectoria en la creación de aplicaciones móviles y sitios web de alto rendimiento. Mi filosofía de trabajo se basa en escribir código limpio, escalable y utilizar las últimas tecnologías para construir soluciones eficientes y personalizadas que aporten valor real.',
        imageAlt: 'Foto de perfil de Jordan Talledo',
        cv: {
            label: 'Descargar CV',
            url: '/TALLEDO SALAZAR JORDAN ENRIQUE - CV 2025.pdf',
        },
        skills: {
            title: 'Habilidades Técnicas',
            list: skills,
        }
    },
    services: {
        title: 'Servicios',
        subtitle: 'Ofrezco una gama de soluciones para llevar tu proyecto al siguiente nivel, desde aplicaciones móviles nativas hasta complejas plataformas web.',
        list: [
            { title: 'Desarrollo de Apps Móviles', description: 'Creación de aplicaciones nativas para Android (Kotlin) e híbridas (Flutter) de alto rendimiento y excelente experiencia de usuario.', icon: Smartphone },
            { title: 'Desarrollo Web', description: 'Desarrollo de sitios y aplicaciones web modernas, responsivas y optimizadas con Next.js y las últimas tecnologías del ecosistema.', icon: Code },
            { title: 'Consultoría de Arquitectura', description: 'Asesoramiento para definir arquitecturas de software robustas, escalables y seguras para tus proyectos tecnológicos.', icon: Cog },
            { title: 'Mantenimiento y Optimización', description: 'Servicios de mantenimiento, optimización de rendimiento y actualización de sitios y aplicaciones existentes para asegurar su vigencia.', icon: Server },
        ]
    },
    projects: {
        title: 'Proyectos Destacados',
        subtitle: 'Una selección de proyectos que demuestran mi experiencia en el desarrollo de soluciones web y móviles.',
        filters: {
            all: 'Todos',
            mobile: 'Apps Móviles',
            web: 'Aplicación Web',
        },
        list: projects,
    },
    testimonials: {
        title: 'Lo que dicen mis clientes',
        subtitle: 'Resultados y satisfacción que hablan por sí mismos. Descubre por qué mis clientes confían en mi trabajo.',
        list: testimonials
    },
    scheduling: {
        title: 'Agendar una Cita',
        subtitle: '¿Listo para discutir tu proyecto? Agenda una reunión conmigo para explorar cómo puedo ayudarte a alcanzar tus objetivos.',
        buttonText: 'Agendar Reunión',
        calendlyUrl: 'https://calendly.com/jordantalledo/30min',
    },
    contact: {
        title: 'Contacto',
        subtitle: '¿Tienes una pregunta o una propuesta de proyecto? No dudes en contactarme a través del formulario o por mis canales directos.',
        form: {
            title: 'Enviar un Mensaje',
            description: 'Completa el formulario y te responderé a la brevedad posible.',
            name: 'Nombre',
            email: 'Correo electrónico',
            phone: 'Teléfono (Opcional)',
            message: 'Mensaje',
            submit: 'Enviar Mensaje',
            success: {
                title: '¡Mensaje Enviado!',
                description: 'Gracias por ponerte en contacto. He recibido tu mensaje y te responderé a la brevedad.',
                resetButton: 'Enviar otro mensaje',
            },
            error: {
                title: 'Error al Enviar',
                description: 'No se pudo enviar el mensaje. Por favor, inténtalo más tarde.',
            },
            validation: {
                name: 'El nombre debe tener al menos 2 caracteres.',
                email: 'Por favor, introduce un correo válido.',
                message: 'El mensaje debe tener al menos 10 caracteres.',
            }
        },
        direct: {
            title: 'Contacto Directo',
            description: 'También puedes contactarme directamente a través de mi correo electrónico o teléfono.',
        },
    },
    social: {
        github: 'https://github.com/jordantalledo',
        linkedin: 'https://linkedin.com/in/jordan-enrique-talledo-salazar-924a55220',
        twitter: 'https://twitter.com',
        email: 'programadortalledo@gmail.com',
        phone: '+51977479152'
    },
    footer: {
        copyright: 'Jordan Enrique Talledo Salazar. Todos los derechos reservados.',
    }
  },
  en: {
    language: 'en',
    nav: {
        about: 'About Me',
        services: 'Services',
        projects: 'Projects',
        contact: 'Contact',
    },
    hero: {
        title: "Jordan Enrique Talledo Salazar",
        subtitle: 'Mobile Application and Website Developer. Innovation, clean code, and custom technology solutions.',
        imageAlt: 'Image of a developer working on his laptop',
        ctaContact: 'Contact Me',
        ctaProjects: 'View Projects',
    },
    about: {
        title: 'About Me',
        bio: "I am a software developer with a solid track record in creating high-performance mobile applications and websites. My work philosophy is based on writing clean, scalable code and using the latest technologies to build efficient, custom solutions that deliver real value.",
        imageAlt: 'Profile picture of Jordan Talledo',
        cv: {
            label: 'Download CV',
            url: '/TALLEDO SALAZAR JORDAN ENRIQUE - CV 2025.pdf',
        },
        skills: {
            title: 'Technical Skills',
            list: skills,
        }
    },
    services: {
        title: 'Services',
        subtitle: 'I offer a range of solutions to take your project to the next level, from native mobile apps to complex web platforms.',
        list: [
            { title: 'Mobile App Development', description: 'Creation of high-performance native applications for Android (Kotlin) and hybrid (Flutter) with excellent user experience.', icon: Smartphone },
            { title: 'Web Development', description: 'Development of modern, responsive, and optimized websites and web applications with Next.js and the latest technologies in the ecosystem.', icon: Code },
            { title: 'Architecture Consulting', description: 'Advice on defining robust, scalable, and secure software architectures for your technology projects.', icon: Cog },
            { title: 'Maintenance & Optimization', description: 'Maintenance, performance optimization, and updating services for existing sites and applications to ensure they stay current.', icon: Server },
        ]
    },
    projects: {
        title: 'Featured Projects',
        subtitle: 'A selection of projects that demonstrate my experience in developing web and mobile solutions.',
        filters: {
            all: 'All',
            mobile: 'Mobile Apps',
            web: 'Web App',
        },
        list: projects,
    },
    testimonials: {
        title: 'What my clients say',
        subtitle: 'Results and satisfaction that speak for themselves. Discover why my clients trust my work.',
        list: testimonials
    },
    scheduling: {
        title: 'Schedule a Meeting',
        subtitle: "Ready to discuss your project? Schedule a meeting with me to explore how I can help you achieve your goals.",
        buttonText: 'Schedule Meeting',
        calendlyUrl: 'https://calendly.com/jordantalledo/30min',
    },
    contact: {
        title: 'Contact',
        subtitle: 'Do you have a question or a project proposal? Feel free to contact me through the form or my direct channels.',
        form: {
            title: 'Send a Message',
            description: 'Complete the form, and I will get back to you as soon as possible.',
            name: 'Name',
            email: 'Email',
            phone: 'Phone (Optional)',
            message: 'Message',
            submit: 'Send Message',
            success: {
                title: 'Message Sent!',
                description: 'Thank you for getting in touch. I have received your message and will get back to you shortly.',
                resetButton: 'Send another message',
            },
            error: {
                title: 'Sending Error',
                description: 'Could not send the message. Please try again later.',
            },
            validation: {
                name: 'Name must be at least 2 characters.',
                email: 'Please enter a valid email.',
                message: 'Message must be at least 10 characters.',
            }
        },
        direct: {
            title: 'Direct Contact',
            description: 'You can also reach me directly via my email or phone.',
        },
    },
    social: {
        github: 'https://github.com/jordantalledo',
        linkedin: 'https://linkedin.com/in/jordan-enrique-talledo-salazar-924a55220',
        twitter: 'https://twitter.com',
        email: 'programadortalledo@gmail.com',
        phone: '+51977479152'
    },
    footer: {
        copyright: 'Jordan Enrique Talledo Salazar. All rights reserved.',
    }
  }
};
