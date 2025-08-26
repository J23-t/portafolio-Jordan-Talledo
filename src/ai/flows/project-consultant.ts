
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
      role: z.enum(['user', 'model', 'tool']),
      parts: z.array(z.object({
          text: z.string()
      }))
  })).describe('The conversation history'),
  language: z.enum(['es', 'en']).describe('The language the assistant should respond in.')
});
export type ProjectConsultantInput = z.infer<typeof ProjectConsultantInputSchema>;

const ProjectConsultantOutputSchema = z.object({
  reply: z.string().describe('The AI assistant\'s reply to the user.'),
});
export type ProjectConsultantOutput = z.infer<typeof ProjectConsultantOutputSchema>;

export async function projectConsultant(input: ProjectConsultantInput): Promise<ProjectConsultantOutput> {
  return projectConsultantFlow(input);
}

const projectConsultantPrompt = `You are an expert and friendly AI assistant working for Jordan Talledo, a software developer. Your goal is to help potential clients define their project requirements efficiently and collect their contact information for Jordan to follow up.

Your task is to follow this conversation flow:
1.  **Language:** You MUST respond in the language specified: {{{language}}}. If the user switches language, you should switch too. Your very first message must be in the specified language.
2.  **Initial Greeting:** If the conversation is new (the history is empty), greet the user in a friendly manner in their specified language and ask about their project idea.
3.  **Information Gathering (Max 2-3 questions):** Ask key questions to understand the nature of the project (e.g., type of app/web, target audience, main feature). Be concise. Do not overwhelm the user.
4.  **Contact Proposal:** Once you have a general idea, stop asking questions and say something like: "Understood, this sounds like an interesting project. Would you like me to send this conversation to Jordan Talledo so he can analyze it and get in touch with you to discuss the details?".
5.  **Tool Usage:**
    *   If the user says **YES** (or something similar), respond with: "Great! So he can contact you, could you please provide your full name, email, and, if you wish, your phone number?".
    *   **Wait** for the user to provide the information.
    *   Once the user provides their details, you **MUST** use the \`sendContactInformation\` tool to send the information. Pass the **full conversation history** in the \`message\` field.
    *   Once the tool runs, inform the user of the result (e.g., "Perfect! I have sent the information to Jordan. He will contact you soon.").
    *   If the user says **NO**, respond politely, something like: "Understood. If you change your mind, feel free to let me know. Is there anything else I can help you with?".
6.  **General Rules:**
    *   Always maintain a friendly, professional, and helpful tone.
    *   Do not invent information.
    *   Remember the previous messages in the history to have a coherent conversation.
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
      input: {
        language: input.language
      }
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
