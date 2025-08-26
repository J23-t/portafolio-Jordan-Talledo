
import { Smartphone, Code, Server, Cog, Database, Wind, Cpu, GitBranch, Layers, SquareCode, Bot, BrainCircuit } from 'lucide-react';
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
        name: 'Dart', 
        icon: Code,
        description_es: 'Un lenguaje de programación optimizado para clientes para crear aplicaciones rápidas en cualquier plataforma. Es el lenguaje detrás de Flutter.',
        description_en: 'A client-optimized programming language for building fast apps on any platform. It is the language behind Flutter.'
    },
    { 
        name: 'Vue.js', 
        icon: Code,
        description_es: 'Un framework de JavaScript progresivo para construir interfaces de usuario. Es conocido por su enfoque incremental y su facilidad de integración.',
        description_en: 'A progressive JavaScript framework for building user interfaces. It is known for its incremental approach and ease of integration.'
    },
    { 
        name: 'Node.js', 
        icon: Server,
        description_es: 'Entorno de ejecución de JavaScript del lado del servidor que permite construir aplicaciones de red escalables y rápidas.',
        description_en: 'A server-side JavaScript runtime environment that allows for building scalable and fast network applications.'
    },
    { 
        name: 'JavaScript', 
        icon: Code,
        description_es: 'El lenguaje de programación fundamental para la web, esencial para crear sitios interactivos y dinámicos.',
        description_en: 'The fundamental programming language for the web, essential for creating interactive and dynamic sites.'
    },
    { 
        name: 'TypeScript', 
        icon: Code,
        description_es: 'Superset de JavaScript que añade tipos estáticos opcionales, mejorando la robustez y mantenibilidad del código.',
        description_en: 'A superset of JavaScript that adds optional static typing, improving code robustness and maintainability.'
    },
    { 
        name: 'Python', 
        icon: Code,
        description_es: 'Un lenguaje de programación versátil y de alto nivel, conocido por su sintaxis clara y su amplio uso en desarrollo web y ciencia de datos.',
        description_en: 'A versatile, high-level programming language known for its clear syntax and widespread use in web development and data science.'
    },
    { 
        name: 'Java', 
        icon: Code,
        description_es: 'Un lenguaje de programación robusto y orientado a objetos, ampliamente utilizado para aplicaciones empresariales y desarrollo Android.',
        description_en: 'A robust, object-oriented programming language widely used for enterprise applications and Android development.'
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
        name: 'MySQL', 
        icon: Database,
        description_es: 'Uno de los sistemas de gestión de bases de datos relacionales de código abierto más populares del mundo, conocido por su fiabilidad y rendimiento.',
        description_en: 'One of the world\'s most popular open-source relational database management systems, known for its reliability and performance.'
    },
    { 
        name: 'MongoDB', 
        icon: Database,
        description_es: 'Base de datos NoSQL orientada a documentos, conocida por su flexibilidad y escalabilidad para aplicaciones modernas.',
        description_en: 'A document-oriented NoSQL database known for its flexibility and scalability for modern applications.'
    },
    { 
        name: 'Firebase Firestore', 
        icon: Database,
        description_es: 'Base de datos de documentos NoSQL flexible y escalable para el desarrollo móvil, web y de servidores de Firebase y Google Cloud.',
        description_en: 'A flexible, scalable NoSQL document database for mobile, web, and server development from Firebase and Google Cloud.'
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
    { 
        name: 'Adaptabilidad Tecnológica', 
        icon: BrainCircuit,
        description_es: 'Capacidad para aprender y dominar rápidamente nuevas tecnologías, lenguajes y frameworks según las necesidades del proyecto.',
        description_en: 'Ability to quickly learn and master new technologies, languages, and frameworks based on project needs.'
    },
];

const projects = [
    {
      title: 'Amoblarq',
      description_es: 'Página web para una empresa de mueblería, con un catálogo de productos y funcionalidades de comercio electrónico.',
      description_en: 'Website for a furniture company, with a product catalog and e-commerce functionalities.',
      technologies: ['Next.js', 'Tailwind CSS', 'MongoDB'],
      imageUrl: '/amoblarq.PNG',
      link: 'https://amoblarq.vercel.app/',
      category: 'web',
    },
    {
      title: 'Ferrefast',
      description_es: 'Página web para una ferretería, incluyendo un catálogo de productos y sistema para realizar cotizaciones.',
      description_en: 'Website for a hardware store, including a product catalog and a system for generating quotes.',
      technologies: ['Next.js', 'Tailwind CSS', 'Firebase'],
      imageUrl: '/ferrefast.PNG',
      link: 'https://ferrefastoficial.vercel.app/',
      category: 'web',
    },
    {
      title: 'Asistencialoficial',
      description_es: 'Aplicación web diseñada para controlar y verificar la asistencia de los trabajadores de una empresa.',
      description_en: 'Web application designed to control and verify the attendance of a company\'s employees.',
      technologies: ['React', 'Node.js', 'SQL Server'],
      imageUrl: '/asistrack.PNG',
      link: 'https://asistencialoficial.netlify.app/',
      category: 'web',
    },
    {
        title: 'Extractor de Datos IQ',
        description_es: 'Herramienta que extrae datos de productos desde sitios web seleccionados por el cliente para un catálogo.',
        description_en: 'A tool that extracts product data from websites selected by the client for a catalog.',
        technologies: ['Next.js', 'Puppeteer', 'Tailwind CSS'],
        imageUrl: '/catalogoiq.PNG',
        link: 'https://extractordedatos.vercel.app/',
        category: 'web',
      },
  ];

const testimonials = [
    {
        quote_es: 'Jordan demostró una increíble capacidad técnica y un compromiso excepcional. Transformó nuestras ideas en productos funcionales y de alta calidad que superaron nuestras expectativas. Su comunicación fue siempre clara y proactiva. Es un desarrollador en quien se puede confiar para cualquier proyecto.',
        quote_en: 'Jordan demonstrated incredible technical ability and exceptional commitment. He transformed our ideas into functional, high-quality products that exceeded our expectations. His communication was always clear and proactive. He is a developer you can trust for any project.',
        name: 'Hugo Urrutia',
        company_es: 'Gerente de Proyectos',
        company_en: 'Project Manager',
        avatar: 'https://picsum.photos/100/100?random=1',
    }
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
    summarizer: {
        title: 'Asistente de Proyectos con IA',
        subtitle: 'Describe tu idea y deja que mi asistente de IA te ayude a definir los requisitos de tu proyecto con preguntas clave.',
        input: {
            title: 'Tu Idea de Proyecto',
            label: 'Describe tu proyecto',
            placeholder: 'Ej: "Quiero una página web para mi negocio de muebles..."',
        },
        output: {
            title: 'Asistente Virtual',
            description: 'Conversación con la IA',
            placeholder: 'La conversación aparecerá aquí. ¡Comienza escribiendo tu idea!',
            contactButton: 'Contactar a Jordan con esta Conversación',
        },
        button: {
            submit: 'Enviar Mensaje',
            loading: 'Pensando...',
        },
        error: {
            title: 'Error en la Conversación',
            description: 'No se pudo obtener una respuesta. Por favor, inténtalo de nuevo.',
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
    summarizer: {
        title: 'AI Project Assistant',
        subtitle: 'Describe your idea and let my AI assistant help you define your project requirements with key questions.',
        input: {
            title: 'Your Project Idea',
            label: 'Describe your project',
            placeholder: 'E.g., "I want a website for my furniture business..."',
        },
        output: {
            title: 'Virtual Assistant',
            description: 'Conversation with AI',
            placeholder: 'The conversation will appear here. Start by typing your idea!',
            contactButton: 'Contact Jordan with this Conversation',
        },
        button: {
            submit: 'Send Message',
            loading: 'Thinking...',
        },
        error: {
            title: 'Conversation Error',
            description: 'Could not get a response. Please try again.',
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

    
    

    
