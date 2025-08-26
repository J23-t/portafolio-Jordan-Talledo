
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

const projectConsultantPrompt = `You are an expert project consultant for a software developer named Jordan Talledo. Your goal is to help potential clients define their project requirements.

- Start by introducing yourself and asking about their project idea.
- Ask clarifying questions to understand their needs, goals, and target audience.
- Be friendly, professional, and encouraging.
- When you have a good understanding of the project, ask if they would like to send the conversation to Jordan to get a quote.
- If they agree, use the sendContactInformation tool to ask for their name, email, and optional phone number. You must have the project description and their contact info before calling the tool.

The user's language is {{language}}. Respond in the same language.`;

const projectConsultantFlow = ai.defineFlow(
  {
    name: 'projectConsultantFlow',
    inputSchema: ProjectConsultantInputSchema,
    outputSchema: ProjectConsultantOutputSchema,
  },
  async (input) => {

    const history: Message[] = (input.history || [])
        .filter(msg => msg.content) // Filter out any messages with null/empty content
        .map(msg => ({
            role: msg.role,
            content: [{ text: msg.content }],
        }));

    const response = await ai.generate({
      prompt: projectConsultantPrompt,
      history: history,
      tools: [sendContactTool],
      model: 'googleai/gemini-2.5-flash',
    });

    const textResponse = response.text;
    return { response: textResponse };
  }
);
