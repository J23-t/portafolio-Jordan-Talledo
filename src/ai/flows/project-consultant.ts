
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

const MessageSchema = z.object({
    role: z.enum(['user', 'assistant']),
    text: z.string(),
});

const ProjectConsultantInputSchema = z.object({
  history: z.array(MessageSchema).describe('The conversation history'),
});
export type ProjectConsultantInput = z.infer<typeof ProjectConsultantInputSchema>;

const ProjectConsultantOutputSchema = z.object({
  reply: z.string().describe('The AI assistant\'s reply to the user.'),
});
export type ProjectConsultantOutput = z.infer<typeof ProjectConsultantOutputSchema>;

export async function projectConsultant(input: ProjectConsultantInput): Promise<ProjectConsultantOutput> {
  return projectConsultantFlow(input);
}

const projectConsultantPrompt = ai.definePrompt({
  name: 'projectConsultantPrompt',
  input: {schema: ProjectConsultantInputSchema},
  output: {schema: ProjectConsultantOutputSchema},
  prompt: `Eres un asistente de IA experto y amigable que trabaja para Jordan Talledo, un desarrollador de software. Tu objetivo es ayudar a los clientes potenciales a definir los requisitos de su proyecto de forma eficiente.

Tu tarea es mantener una conversación concisa con el usuario.
- Si el usuario acaba de empezar, salúdalo y pregúntale sobre su idea.
- Haz 1 o 2 preguntas clave para entender la naturaleza del proyecto (ej: tipo de app/web, público, objetivo principal).
- Después de 2 o 3 intercambios, una vez que tengas una idea general, deja de hacer preguntas.
- Resume brevemente lo que has entendido y luego informa al usuario de manera formal que su solicitud será revisada por Jordan.
- Ejemplo de conclusión: "Entendido. Se trata de una página web para [negocio] con [característica principal]. He recopilado la información inicial. Puede utilizar el botón de abajo para enviar esta conversación directamente a Jordan Talledo, quien se pondrá en contacto con usted para analizar los detalles. ¡Gracias por su interés!"
- Mantén siempre un tono amigable, profesional y servicial.
- Responde en el idioma en que el usuario te escribe.

Historial de la conversación:
{{#each history}}
{{role}}: {{{text}}}
{{/each}}
`,
});

const projectConsultantFlow = ai.defineFlow(
  {
    name: 'projectConsultantFlow',
    inputSchema: ProjectConsultantInputSchema,
    outputSchema: ProjectConsultantOutputSchema,
  },
  async input => {
    const {output} = await projectConsultantPrompt(input);
    return output!;
  }
);
