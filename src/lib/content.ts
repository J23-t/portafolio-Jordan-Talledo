
import { Smartphone, Code, Server, Cog, Database, Wind, Cpu, GitBranch, Layers, SquareCode, Bot } from 'lucide-react';
import type { ContentData } from './types';

const skills = [
    { 
        name: 'Next.js', 
        icon: SquareCode,
        description_es: 'Framework de React para construir aplicaciones web rápidas y escalables con renderizado del lado del servidor y generación de sitios estáticos.',
        description_en: 'A React framework for building fast and scalable web applications with server-side rendering and static site generation.'
    },
    { 
        name: 'Kotlin', 
        icon: Code,
        description_es: 'Lenguaje de programación moderno y conciso, preferido por Google para el desarrollo de aplicaciones Android nativas.',
        description_en: 'A modern and concise programming language, preferred by Google for native Android app development.'
    },
    { 
        name: 'Flutter', 
        icon: Smartphone,
        description_es: 'Kit de herramientas de UI de Google para construir aplicaciones compiladas nativamente para móvil, web y escritorio desde una única base de código.',
        description_en: 'Google\'s UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase.'
    },
    { 
        name: 'HTML', 
        icon: Code,
        description_es: 'Lenguaje de marcado estándar para crear páginas y aplicaciones web. Es el esqueleto de todo sitio web.',
        description_en: 'The standard markup language for creating web pages and web applications. It is the skeleton of every website.'
    },
    { 
        name: 'CSS', 
        icon: Code,
        description_es: 'Lenguaje de hojas de estilo utilizado para describir la presentación de un documento escrito en un lenguaje de marcado como HTML.',
        description_en: 'A stylesheet language used for describing the presentation of a document written in a markup language like HTML.'
    },
    { 
        name: 'TypeScript', 
        icon: Code,
        description_es: 'Superset de JavaScript que añade tipos estáticos opcionales, mejorando la robustez y mantenibilidad del código.',
        description_en: 'A superset of JavaScript that adds optional static typing, improving code robustness and maintainability.'
    },
    { 
        name: 'Tailwind CSS', 
        icon: Wind,
        description_es: 'Framework de CSS de "utilidad primero" que permite construir diseños personalizados rápidamente sin escribir CSS convencional.',
        description_en: 'A "utility-first" CSS framework that allows for building custom designs quickly without writing conventional CSS.'
    },
    { 
        name: 'SQL Server', 
        icon: Database,
        description_es: 'Sistema de gestión de bases de datos relacionales de Microsoft, utilizado para almacenar y recuperar datos en aplicaciones empresariales.',
        description_en: 'Microsoft\'s relational database management system, used for storing and retrieving data in enterprise applications.'
    },
    { 
        name: 'MongoDB', 
        icon: Database,
        description_es: 'Base de datos NoSQL orientada a documentos, conocida por su flexibilidad y escalabilidad para aplicaciones modernas.',
        description_en: 'A document-oriented NoSQL database known for its flexibility and scalability for modern applications.'
    },
    { 
        name: 'Git', 
        icon: GitBranch,
        description_es: 'Sistema de control de versiones distribuido, esencial para el seguimiento de cambios en el código fuente durante el desarrollo de software.',
        description_en: 'A distributed version control system, essential for tracking changes in source code during software development.'
    },
    { 
        name: 'CI/CD', 
        icon: Cpu,
        description_es: 'Prácticas de Integración y Entrega Continua, que automatizan las fases de construcción y despliegue del desarrollo de software.',
        description_en: 'Continuous Integration and Continuous Delivery practices, which automate the build and deployment phases of software development.'
    },
    { 
        name: 'REST APIs', 
        icon: Layers,
        description_es: 'Estilo de arquitectura para diseñar aplicaciones en red. Utilizado para crear servicios web interoperables y escalables.',
        description_en: 'An architectural style for designing networked applications. Used to create interoperable and scalable web services.'
    },
];

const projects = [
    {
      title: 'Amoblarq',
      description_es: 'Página web para una empresa de mueblería, con un catálogo de productos y funcionalidades de comercio electrónico.',
      description_en: 'Website for a furniture company, with a product catalog and e-commerce functionalities.',
      technologies: ['Next.js', 'Tailwind CSS', 'MongoDB'],
      imageUrl: 'https://picsum.photos/600/401',
      link: 'https://amoblarq.vercel.app/',
      category: 'web',
    },
    {
      title: 'Ferrefast',
      description_es: 'Página web para una ferretería, incluyendo un catálogo de productos y sistema para realizar cotizaciones.',
      description_en: 'Website for a hardware store, including a product catalog and a system for generating quotes.',
      technologies: ['Next.js', 'Tailwind CSS', 'Firebase'],
      imageUrl: 'https://picsum.photos/600/402',
      link: 'https://ferrefastoficial.vercel.app/',
      category: 'web',
    },
    {
      title: 'Asistencialoficial',
      description_es: 'Aplicación web diseñada para controlar y verificar la asistencia de los trabajadores de una empresa.',
      description_en: 'Web application designed to control and verify the attendance of a company\'s employees.',
      technologies: ['React', 'Node.js', 'SQL Server'],
      imageUrl: 'https://picsum.photos/600/403',
      link: 'https://asistencialoficial.netlify.app/',
      category: 'web',
    },
    {
        title: 'Extractor de Datos IQ',
        description_es: 'Herramienta que extrae datos de productos desde sitios web seleccionados por el cliente para un catálogo.',
        description_en: 'A tool that extracts product data from websites selected by the client for a catalog.',
        technologies: ['Next.js', 'Puppeteer', 'Tailwind CSS'],
        imageUrl: 'https://picsum.photos/600/404',
        link: 'https://extractordedatos.vercel.app/',
        category: 'web',
      },
  ];

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
            url: '/jordan_talledo_cv.pdf',
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
    summarizer: {
        title: 'Asistente de Código con IA',
        subtitle: 'Pega un fragmento de código y mi asistente de IA lo analizará, explicará su funcionamiento y sugerirá posibles optimizaciones.',
        input: {
            title: 'Fragmento de Código',
            label: 'Pega tu código aquí',
            placeholder: 'function ejemplo(a, b) {\n  return a + b;\n}',
        },
        output: {
            title: 'Análisis y Sugerencias',
            description: 'Resultados generados por la IA',
            placeholder: 'El análisis del código aparecerá aquí.',
        },
        button: {
            submit: 'Analizar Código',
            loading: 'Analizando...',
        },
        error: {
            title: 'Error en el Análisis',
            description: 'No se pudo analizar el código. Por favor, inténtalo de nuevo.',
        }
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
            url: '/jordan_talledo_cv.pdf',
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
    summarizer: {
        title: 'AI Code Assistant',
        subtitle: 'Paste a code snippet, and my AI assistant will analyze it, explain how it works, and suggest potential optimizations.',
        input: {
            title: 'Code Snippet',
            label: 'Paste your code here',
            placeholder: 'function example(a, b) {\n  return a + b;\n}',
        },
        output: {
            title: 'Analysis and Suggestions',
            description: 'Results generated by AI',
            placeholder: 'The code analysis will appear here.',
        },
        button: {
            submit: 'Analyze Code',
            loading: 'Analyzing...',
        },
        error: {
            title: 'Analysis Error',
            description: 'Could not analyze the code. Please try again.',
        }
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

    
    
