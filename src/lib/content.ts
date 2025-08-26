
import { Smartphone, Code, Server, Cog, Database, Wind, Cpu, GitBranch, Layers, SquareCode, Bot } from 'lucide-react';
import type { ContentData } from './types';

const skills = [
    { name: 'Next.js', icon: SquareCode },
    { name: 'Kotlin', icon: Code },
    { name: 'Flutter', icon: Smartphone },
    { name: 'HTML', icon: Code },
    { name: 'CSS', icon: Code },
    { name: 'TypeScript', icon: Code },
    { name: 'Tailwind CSS', icon: Wind },
    { name: 'SQL Server', icon: Database },
    { name: 'MongoDB', icon: Database },
    { name: 'Git', icon: GitBranch },
    { name: 'CI/CD', icon: Cpu },
    { name: 'REST APIs', icon: Layers },
];

const projects = [
    {
      title: 'Amoblarq',
      description_es: 'Plataforma de comercio electrónico para una empresa de mueblería, con catálogo de productos y carrito de compras.',
      description_en: 'E-commerce platform for a furniture company, with product catalog and shopping cart.',
      technologies: ['Next.js', 'Tailwind CSS', 'MongoDB'],
      imageUrl: 'https://picsum.photos/600/401',
      link: 'https://amoblarq.vercel.app/',
      category: 'web',
    },
    {
      title: 'Ferrefast',
      description_es: 'Página web para una ferretería, con catálogo de productos y funcionalidades para cotizaciones.',
      description_en: 'Website for a hardware store, with a product catalog and quotation functionalities.',
      technologies: ['Next.js', 'Tailwind CSS', 'Firebase'],
      imageUrl: 'https://picsum.photos/600/402',
      link: 'https://ferrefastoficial.vercel.app/',
      category: 'web',
    },
    {
      title: 'Asistencia AOF',
      description_es: 'Aplicación para controlar y verificar la asistencia de los trabajadores de una empresa.',
      description_en: 'Application to control and verify the attendance of a company\'s workers.',
      technologies: ['React', 'Node.js', 'SQL Server'],
      imageUrl: 'https://picsum.photos/600/403',
      link: 'https://asistencialoficial.netlify.app/',
      category: 'web',
    },
    {
        title: 'Extractor de Datos IQ',
        description_es: 'Herramienta para extraer datos de productos desde la página web elegida por el cliente.',
        description_en: 'A tool to extract product data from the website chosen by the client.',
        technologies: ['Next.js', 'Puppeteer', 'Tailwind CSS'],
        imageUrl: 'https://picsum.photos/600/404',
        link: 'https://extractordedatos.vercel.app/',
        category: 'web',
      },
  ];

const testimonials = [
    {
        quote_es: 'Jordan entregó un producto de alta calidad que superó nuestras expectativas. Su profesionalismo y atención al detalle son inigualables.',
        quote_en: 'Jordan delivered a high-quality product that exceeded our expectations. His professionalism and attention to detail are unmatched.',
        name: 'Ana García',
        company: 'CEO de Tech Solutions',
        avatar: 'https://picsum.photos/100/100?random=1'
    },
    {
        quote_es: 'Trabajar con Jordan fue una excelente experiencia. Es un desarrollador muy talentoso y comunicativo. ¡Lo recomiendo totalmente!',
        quote_en: 'Working with Jordan was an excellent experience. He is a very talented and communicative developer. I highly recommend him!',
        name: 'Carlos Pérez',
        company: 'Gerente de Producto en Innovate Corp',
        avatar: 'https://picsum.photos/100/100?random=2'
    },
     {
        quote_es: 'La aplicación móvil que desarrolló para nosotros es robusta, rápida y fácil de usar. Un trabajo excepcional.',
        quote_en: 'The mobile app he developed for us is robust, fast, and user-friendly. Exceptional work.',
        name: 'Laura Martinez',
        company: 'Fundadora de FitLife',
        avatar: 'https://picsum.photos/100/100?random=3'
    }
];

export const content: ContentData = {
  es: {
    nav: {
        about: 'Sobre mí',
        services: 'Servicios',
        projects: 'Proyectos',
        contact: 'Contacto',
    },
    hero: {
        title: 'Soy Jordan Talledo, desarrollador web y móvil',
        subtitle: 'Innovación, código limpio y soluciones tecnológicas personalizadas.',
        imageAlt: 'Imagen de un desarrollador trabajando en su laptop',
        ctaContact: 'Contáctame',
        ctaProjects: 'Ver mis proyectos',
    },
    about: {
        title: 'Sobre mí',
        bio: 'Soy un apasionado desarrollador de software con una sólida experiencia en la creación de aplicaciones móviles y sitios web de alto rendimiento. Mi enfoque se centra en escribir código limpio y escalable, y en utilizar las últimas tecnologías para construir soluciones eficientes y personalizadas que aporten valor real a mis clientes.',
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
        title: 'Servicios que ofrezco',
        subtitle: 'Desde aplicaciones móviles nativas hasta complejas plataformas web, ofrezco un abanico de soluciones para llevar tu idea al siguiente nivel.',
        list: [
            { title: 'Desarrollo de Apps Móviles', description: 'Creación de aplicaciones nativas para Android (Kotlin) e híbridas (Flutter) de alto rendimiento.', icon: Smartphone },
            { title: 'Desarrollo Web', description: 'Desarrollo de sitios y aplicaciones web modernas y responsivas con Next.js y las últimas tecnologías.', icon: Code },
            { title: 'Consultoría de Arquitectura', description: 'Asesoramiento en la definición de arquitecturas de software robustas y escalables para tus proyectos.', icon: Cog },
            { title: 'Mantenimiento y Optimización', description: 'Servicios de mantenimiento, optimización de rendimiento y actualización de sitios y aplicaciones existentes.', icon: Server },
        ]
    },
    projects: {
        title: 'Mis Proyectos',
        subtitle: 'Aquí hay una selección de algunos de los proyectos en los que he trabajado. Cada uno representa un desafío único y una oportunidad para crecer.',
        filters: {
            all: 'Todos',
            mobile: 'Apps Móviles',
            web: 'Web',
        },
        list: projects.map(p => ({...p, description_es: p.description_es, description_en: p.description_en})),
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
        title: '¿Hablamos de tu proyecto?',
        subtitle: 'Estoy disponible para discutir tus ideas y cómo puedo ayudarte a hacerlas realidad.',
        buttonText: 'Agendar una reunión',
        calendlyUrl: 'https://calendly.com',
    },
    testimonials: {
        title: 'Lo que dicen de mí',
        subtitle: 'Testimonios de clientes y colegas con los que he tenido el placer de trabajar.',
        list: testimonials.map(t => ({...t, quote: t.quote_es, company: t.company, name: t.name, avatar: t.avatar}))
    },
    contact: {
        title: 'Contacto',
        subtitle: '¿Tienes una pregunta o una propuesta? No dudes en contactarme.',
        form: {
            title: 'Envíame un mensaje',
            description: 'Completa el formulario y te responderé lo antes posible.',
            name: 'Nombre',
            email: 'Correo electrónico',
            phone: 'Teléfono (Opcional)',
            message: 'Mensaje',
            submit: 'Enviar Mensaje',
            success: {
                title: '¡Mensaje enviado!',
                description: 'Gracias por contactarme. Te responderé pronto.',
            },
            validation: {
                name: 'El nombre debe tener al menos 2 caracteres.',
                email: 'Por favor, introduce un correo válido.',
                message: 'El mensaje debe tener al menos 10 caracteres.',
            }
        },
        direct: {
            title: 'Contacto Directo',
            description: 'También puedes encontrarme en estas plataformas.',
        },
    },
    social: {
        github: 'https://github.com/jordantalledo',
        linkedin: 'https://linkedin.com/in/jordan-enrique-talledo-salazar-924a55220',
        twitter: 'https://twitter.com'
    },
    footer: {
        copyright: 'Jordan Talledo. Todos los derechos reservados.',
    }
  },
  en: {
    nav: {
        about: 'About Me',
        services: 'Services',
        projects: 'Projects',
        contact: 'Contact',
    },
    hero: {
        title: "I'm Jordan Talledo, Web and Mobile Developer",
        subtitle: 'Innovation, clean code, and custom technology solutions.',
        imageAlt: 'Image of a developer working on his laptop',
        ctaContact: 'Contact Me',
        ctaProjects: 'View My Projects',
    },
    about: {
        title: 'About Me',
        bio: "I am a passionate software developer with solid experience in creating high-performance mobile applications and websites. My focus is on writing clean, scalable code and using the latest technologies to build efficient, custom solutions that bring real value to my clients.",
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
        title: 'Services I Offer',
        subtitle: 'From native mobile apps to complex web platforms, I offer a range of solutions to take your idea to the next level.',
        list: [
            { title: 'Mobile App Development', description: 'Creation of high-performance native applications for Android (Kotlin) and hybrid (Flutter).', icon: Smartphone },
            { title: 'Web Development', description: 'Development of modern and responsive websites and web applications with Next.js and the latest technologies.', icon: Code },
            { title: 'Architecture Consulting', description: 'Advice on defining robust and scalable software architectures for your projects.', icon: Cog },
            { title: 'Maintenance & Optimization', description: 'Maintenance, performance optimization, and updating services for existing sites and applications.', icon: Server },
        ]
    },
    projects: {
        title: 'My Projects',
        subtitle: 'Here is a selection of some of the projects I have worked on. Each one represents a unique challenge and an opportunity for growth.',
        filters: {
            all: 'All',
            mobile: 'Mobile Apps',
            web: 'Web',
        },
        list: projects.map(p => ({...p, description_es: p.description_es, description_en: p.description_en})),
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
        title: "Let's talk about your project",
        subtitle: "I'm available to discuss your ideas and how I can help bring them to life.",
        buttonText: 'Schedule a Meeting',
        calendlyUrl: 'https://calendly.com',
    },
    testimonials: {
        title: 'What They Say About Me',
        subtitle: 'Testimonials from clients and colleagues I have had the pleasure of working with.',
        list: testimonials.map(t => ({...t, quote: t.quote_en, company: t.company, name: t.name, avatar: t.avatar}))
    },
    contact: {
        title: 'Contact',
        subtitle: 'Have a question or a proposal? Do not hesitate to contact me.',
        form: {
            title: 'Send me a message',
            description: 'Complete the form and I will get back to you as soon as possible.',
            name: 'Name',
            email: 'Email',
            phone: 'Phone (Optional)',
            message: 'Message',
            submit: 'Send Message',
            success: {
                title: 'Message sent!',
                description: "Thanks for reaching out. I'll get back to you soon.",
            },
            validation: {
                name: 'Name must be at least 2 characters.',
                email: 'Please enter a valid email.',
                message: 'Message must be at least 10 characters.',
            }
        },
        direct: {
            title: 'Direct Contact',
            description: 'You can also find me on these platforms.',
        },
    },
    social: {
        github: 'https://github.com/jordantalledo',
        linkedin: 'https://linkedin.com/in/jordan-enrique-talledo-salazar-924a55220',
        twitter: 'https://twitter.com'
    },
    footer: {
        copyright: 'Jordan Talledo. All rights reserved.',
    }
  }
};
