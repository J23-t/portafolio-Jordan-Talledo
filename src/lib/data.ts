import { Smartphone, Code, Server, Cog, Database, Wind, Cpu, GitBranch, Layers, SquareCode, Bot, BrainCircuit } from 'lucide-react';
import type { Project, Skill, Testimonial } from './types';

export const skills: Skill[] = [
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

export const projects: Project[] = [
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

export const testimonials: Testimonial[] = [
    {
        quote_es: 'Jordan demostró una increíble capacidad técnica y un compromiso excepcional. Transformó nuestras ideas en productos funcionales y de alta calidad que superaron nuestras expectativas. Su comunicación fue siempre clara y proactiva. Es un desarrollador en quien se puede confiar para cualquier proyecto.',
        quote_en: 'Jordan demonstrated incredible technical ability and exceptional commitment. He transformed our ideas into functional, high-quality products that exceeded our expectations. His communication was always clear and proactive. He is a developer you can trust for any project.',
        name: 'Hugo Urrutia',
        company_es: 'Gerente de Proyectos',
        company_en: 'Project Manager',
        avatar: 'https://picsum.photos/100/100?random=1',
    }
];
