
'use server';
/**
 * @fileOverview A project consultant AI agent that helps users define their project requirements.
 *
 * - projectConsultant - A function that handles the project consultation process.
 * - ProjectConsultantInput - The input type for the projectConsultant function.
 * - ProjectConsultantOutput - The return type for the projectConsultant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { sendContactEmail } from './send-contact-email';
import type { Message } from 'genkit';


const sendContactTool = ai.defineTool(
    {
      name: 'sendContactInformation',
      description: 'When the user agrees to be contacted, use this tool to collect their contact details and the conversation summary.',
      inputSchema: z.object({
        name: z.string().describe("The user's full name."),
        email: z.string().email().describe("The user's email address."),
        phone: z.string().optional().describe("The user's phone number."),
        message: z.string().describe("The full conversation history to be sent in the email body."),
      }),
      outputSchema: z.string(),
    },
    async (input) => {
        const result = await sendContactEmail(input);
        if (result.success) {
            return "Email sent successfully. Please inform the user.";
        } else {
            return `Failed to send email. Inform the user and ask them to try the main contact form. Error: ${result.message}`;
        }
    }
);

const ProjectConsultantInputSchema = z.object({
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional(),
});
export type ProjectConsultantInput = z.infer<typeof ProjectConsultantInputSchema>;

const ProjectConsultantOutputSchema = z.object({
  response: z.string(),
});
export type ProjectConsultantOutput = z.infer<typeof ProjectConsultantOutputSchema>;

export async function projectConsultant(input: ProjectConsultantInput): Promise<ProjectConsultantOutput> {
  return projectConsultantFlow(input);
}

const projectConsultantPrompt = `Eres un consultor de proyectos experto para un desarrollador de software llamado Jordan Talledo. Tu objetivo es ayudar a los clientes potenciales a definir los requisitos de su proyecto. Responde siempre en español.

- Comienza presentándote y preguntando el nombre del usuario para poder dirigirte a él de forma personalizada.
- Una vez que el usuario te dé su nombre, úsalo en la conversación. Luego, pregunta sobre su idea de proyecto.
- Haz preguntas aclaratorias para comprender sus necesidades, objetivos y público objetivo.
- Sé amable, profesional y alentador.
- Cuando tengas una buena comprensión del proyecto, pregunta si les gustaría enviar la conversación a Jordan para obtener una cotización.
- Si están de acuerdo, utiliza la herramienta 'sendContactInformation' para solicitar su correo electrónico y número de teléfono opcional. Ya deberías tener su nombre. Debes tener la descripción del proyecto y su información de contacto antes de llamar a la herramienta.`;

const projectConsultantFlow = ai.defineFlow(
  {
    name: 'projectConsultantFlow',
    inputSchema: ProjectConsultantInputSchema,
    outputSchema: ProjectConsultantOutputSchema,
  },
  async (input) => {

    const history: Message[] = (input.history || [])
        .filter(msg => msg.content) // Filter out messages with no content
        .map(msg => ({
            role: msg.role,
            content: [{ text: msg.content }],
        }));

    const response = await ai.generate({
      prompt: projectConsultantPrompt,
      history: history,
      tools: [sendContactTool],
      model: 'googleai/gemini-1.5-flash',
    });

    const textResponse = response.text;
    return { response: textResponse };
  }
);
