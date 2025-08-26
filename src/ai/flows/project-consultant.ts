
'use server';

/**
 * @fileOverview AI-powered project consultant flow.
 *
 * - projectConsultant - A function that acts as a project consultant.
 * - ProjectConsultantInput - The input type for the projectConsultant function.
 * - ProjectConsultantOutput - The return type for the projectConsultant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { sendContactEmail, type ContactFormInput } from './send-contact-email';


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
        await sendContactEmail(input);
        return "Contact information has been sent to Jordan Talledo. He will be in touch with you shortly.";
    }
);

const MessageSchema = z.object({
    role: z.enum(['user', 'assistant', 'tool']),
    content: z.array(z.object({
        text: z.string().optional(),
        toolRequest: z.any().optional(),
        toolResponse: z.any().optional(),
    }))
});

const ProjectConsultantInputSchema = z.object({
  history: z.array(z.object({
      role: z.enum(['user', 'model']),
      parts: z.array(z.object({
          text: z.string()
      }))
  })).describe('The conversation history'),
});
export type ProjectConsultantInput = z.infer<typeof ProjectConsultantInputSchema>;

const ProjectConsultantOutputSchema = z.object({
  reply: z.string().describe('The AI assistant\'s reply to the user.'),
});
export type ProjectConsultantOutput = z.infer<typeof ProjectConsultantOutputSchema>;

export async function projectConsultant(input: ProjectConsultantInput): Promise<ProjectConsultantOutput> {
  return projectConsultantFlow(input);
}

const projectConsultantPrompt = `Eres un asistente de IA experto y amigable que trabaja para Jordan Talledo, un desarrollador de software. Tu objetivo es ayudar a los clientes potenciales a definir los requisitos de su proyecto de forma eficiente y recopilar su información de contacto para que Jordan pueda hacer un seguimiento.

Tu tarea es seguir este flujo de conversación:
1.  **Saludo Inicial:** Si la conversación es nueva (el historial está vacío), saluda al usuario amistosamente y pregunta sobre su idea de proyecto.
2.  **Recopilación de Información (Máx. 2-3 preguntas):** Haz preguntas clave para entender la naturaleza del proyecto (ej: tipo de app/web, público objetivo, característica principal). Sé conciso. No abrumes al usuario.
3.  **Propuesta de Contacto:** Una vez que tengas una idea general, detén las preguntas y di algo como: "Entendido, esto suena como un proyecto interesante. ¿Te gustaría que le envíe esta conversación a Jordan Talledo para que pueda analizarla y ponerse en contacto contigo para discutir los detalles?".
4.  **Uso de la Herramienta:**
    *   Si el usuario dice **SÍ** (o algo similar), responde con: "¡Genial! Para que pueda contactarte, ¿podrías darme tu nombre completo, correo electrónico y, si lo deseas, tu número de teléfono?".
    *   **Espera** a que el usuario proporcione la información.
    *   Una vez que el usuario proporcione sus datos, **DEBES** usar la herramienta \`sendContactInformation\` para enviar la información. Pasa el **historial completo de la conversación** en el campo \`message\`.
    *   Una vez que la herramienta se ejecute, informa al usuario del resultado (por ejemplo, "¡Perfecto! Le he enviado la información a Jordan. Se pondrá en contacto contigo pronto.").
    *   Si el usuario dice **NO**, responde amablemente, algo como: "Entendido. Si cambias de opinión, no dudes en decírmelo. ¿Hay algo más en lo que pueda ayudarte?".
5.  **Reglas Generales:**
    *   Mantén siempre un tono amigable, profesional y servicial.
    *   Responde en el idioma en que el usuario te escribe.
    *   No inventes información.
`;

const projectConsultantFlow = ai.defineFlow(
  {
    name: 'projectConsultantFlow',
    inputSchema: ProjectConsultantInputSchema,
    outputSchema: ProjectConsultantOutputSchema,
  },
  async (input) => {
    const response = await ai.generate({
      prompt: projectConsultantPrompt,
      history: input.history,
      tools: [sendContactTool],
      model: 'googleai/gemini-1.5-flash-latest',
    });

    const toolRequests = response.toolRequests;
    if (toolRequests.length > 0) {
      const toolResponses = [];
      for (const toolRequest of toolRequests) {
        const toolResponse = await toolRequest.execute();
        toolResponses.push(toolResponse);
      }

      const finalResponse = await response.continue(toolResponses);
      return { reply: finalResponse.text };
    }

    return { reply: response.text };
  }
);
