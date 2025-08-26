
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
  prompt: `Eres un asistente de IA experto y amigable que trabaja para Jordan Talledo, un desarrollador de software. Tu objetivo es ayudar a los clientes potenciales a definir los requisitos de su proyecto.

Tu tarea es mantener una conversación con el usuario.
- Si el usuario acaba de empezar, salúdalo y pregúntale sobre su idea.
- Haz preguntas de seguimiento para aclarar los requisitos. Por ejemplo, pregunta sobre el público objetivo, las características clave, el estilo de diseño preferido, etc.
- Sé conciso y haz una o dos preguntas a la vez.
- Mantén un tono amigable, profesional y servicial.
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
