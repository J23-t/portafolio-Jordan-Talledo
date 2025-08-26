'use server';
/**
 * @fileOverview A project consultant AI agent that helps define project requirements.
 *
 * - projectConsultant - A function that handles the project consultation process.
 * - ProjectConsultantInput - The input type for the projectConsultant function.
 * - ProjectConsultantOutput - The return type for the projectConsultant function.
 */

import { ai } from '@/ai/genkit';
import { sendContactEmail } from './send-contact-email';
import { z } from 'genkit';
import type { Message, Part } from 'genkit';

const ProjectConsultantInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })),
});
export type ProjectConsultantInput = z.infer<typeof ProjectConsultantInputSchema>;

const ProjectConsultantOutputSchema = z.object({
  response: z.string(),
});
export type ProjectConsultantOutput = z.infer<typeof ProjectConsultantOutputSchema>;

export async function projectConsultant(input: ProjectConsultantInput): Promise<ProjectConsultantOutput> {
  return projectConsultantFlow(input);
}

const sendContactInformation = ai.defineTool(
    {
      name: 'sendContactInformation',
      description: 'Cuando el usuario acepte ser contactado, utiliza esta herramienta para recopilar sus datos de contacto y el resumen de la conversación.',
      inputSchema: z.object({
        name: z.string().describe('El nombre completo del usuario.'),
        email: z.string().email().describe('La dirección de correo electrónico del usuario.'),
        phone: z.string().optional().describe('El número de teléfono del usuario.'),
        message: z.string().describe('El historial completo de la conversación que se enviará en el cuerpo del correo electrónico.'),
      }),
      outputSchema: z.string(),
    },
    async (input) => {
        const result = await sendContactEmail(input);
        if (result.success) {
            return 'Correo enviado con éxito. Agradécele al usuario y dile que Jordan se pondrá en contacto pronto.';
        } else {
            return `Error al enviar el correo: ${result.message}. Informa al usuario del error y sugiérele que lo intente de nuevo más tarde o que use otro método de contacto.`;
        }
    }
);


const projectConsultantFlow = ai.defineFlow(
  {
    name: 'projectConsultantFlow',
    inputSchema: ProjectConsultantInputSchema,
    outputSchema: ProjectConsultantOutputSchema,
    config: {
        maxRetries: 1,
    }
  },
  async (input) => {

    const validHistory: Message[] = input.history
      .filter(msg => msg.content && msg.content.trim() !== '')
      .map(msg => {
          const contentAsParts: Part[] = [{ text: msg.content }];
          return {
              role: msg.role,
              content: contentAsParts
          };
      });

    const { response } = await ai.generate({
      tools: [sendContactInformation],
      prompt: `Eres Gemini, un consultor experto en proyectos de software y asistente personal de Jordan Talledo. Tu objetivo principal es ayudar a los clientes potenciales a definir los requisitos de sus proyectos de software a través de una conversación amigable y profesional. La conversación SIEMPRE debe ser en español.

      Tu flujo de conversación debe ser el siguiente:
      1.  **Presentación y Solicitud de Nombre**: Preséntate cordialmente. Si el historial de conversación está vacío, tu PRIMERA respuesta, sin excepción, debe ser para presentarte y pedir el nombre del usuario. Ejemplo: "¡Hola! Soy Gemini, el consultor de proyectos de Jordan. Es un placer ayudarte. Para empezar, ¿podrías decirme tu nombre?". No hagas nada más hasta que el usuario te dé su nombre.

      2.  **Inicio de la Consulta (usando su nombre)**: Una vez que el usuario te haya dado su nombre, úsalo para dirigirte a él. Comienza a indagar sobre su proyecto. Tu objetivo es entender qué necesita. Haz preguntas abiertas. Ejemplos: "¡Hola, [Nombre del Usuario]! Qué bueno tenerte aquí. Cuéntame un poco sobre la idea que tienes en mente. ¿Qué tipo de página web o aplicación necesitas?", "¿En qué consiste tu proyecto?".

      3.  **Profundización en los Requisitos**: Basándote en sus respuestas, haz preguntas de seguimiento para obtener detalles. Tu objetivo es recopilar información útil para que Jordan pueda hacer una cotización. Algunas preguntas clave que puedes hacer son:
          - ¿Cuál es el objetivo principal de la página/aplicación? (Vender, informar, etc.)
          - ¿Ya tienes un diseño o una idea visual?
          - ¿Necesitas alguna funcionalidad específica? (Ej: un blog, una tienda online, un sistema de reservas, etc.)
          - ¿A qué público va dirigido?

      4.  **Propuesta de Contacto**: Cuando sientas que tienes una buena comprensión general del proyecto (después de 3-5 intercambios de mensajes), ofrece al usuario el siguiente paso. Explícale que puedes enviar toda la conversación a Jordan para que él pueda analizarla y preparar una propuesta o cotización. Pregúntale si está de acuerdo y si es así, pídele su nombre completo (si no lo tienes), su correo electrónico y, opcionalmente, su número de teléfono para usar la herramienta 'sendContactInformation'. Ejemplo: "Gracias por los detalles, [Nombre del Usuario]. Con esta información, Jordan puede hacerse una buena idea de tu proyecto. ¿Te parece bien si le envío un resumen de nuestra conversación para que pueda contactarte con una propuesta? Si es así, por favor, confírmame tu nombre completo y tu dirección de correo electrónico."

      5.  **Manejo de la Herramienta**: Si el usuario acepta y proporciona sus datos, utiliza la herramienta 'sendContactInformation' para enviar el correo. Si se produce un error, informa al usuario amablemente. Si tiene éxito, agradécele y dile que Jordan se pondrá en contacto pronto.

      **Reglas importantes**:
      - Sé siempre amable, profesional y conversacional.
      - NUNCA entres en un bucle. Si ya tienes el nombre, no lo vuelvas a pedir. Usa el historial de la conversación como contexto.
      - No seas repetitivo. Varía tus preguntas.
      - Si el usuario hace preguntas sobre Jordan (su experiencia, etc.), puedes usar la información del portafolio para responderlas.
      - Tu única función es ser un consultor de proyectos. No respondas a preguntas que no estén relacionadas con ese propósito.
      `,
      history: validHistory,
    });

    const textResponse = response.text()!;
    return { response: textResponse };
  }
);
