'use server';

/**
 * @fileOverview AI-powered code analysis flow.
 *
 * - summarizeContent - A function that analyzes code and suggests improvements.
 * - SummarizeContentInput - The input type for the summarizeContent function.
 * - SummarizeContentOutput - The return type for the summarizeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContentInputSchema = z.object({
  content: z.string().describe('The code snippet to analyze'),
});
export type SummarizeContentInput = z.infer<typeof SummarizeContentInputSchema>;

const SummarizeContentOutputSchema = z.object({
  summary: z.string().describe('An explanation of the code and suggestions for optimization.'),
});
export type SummarizeContentOutput = z.infer<typeof SummarizeContentOutputSchema>;

export async function summarizeContent(input: SummarizeContentInput): Promise<SummarizeContentOutput> {
  return summarizeContentFlow(input);
}

const summarizeContentPrompt = ai.definePrompt({
  name: 'summarizeContentPrompt',
  input: {schema: SummarizeContentInputSchema},
  output: {schema: SummarizeContentOutputSchema},
  prompt: `You are an expert software developer and AI assistant. Your task is to analyze a code snippet, explain its functionality, and provide suggestions for improvement or optimization.

Analyze the following code snippet:

\`\`\`
{{{content}}}
\`\`\`

Provide a clear explanation of what the code does, and then offer specific, actionable suggestions for how it could be improved (e.g., performance, readability, best practices).`,
});

const summarizeContentFlow = ai.defineFlow(
  {
    name: 'summarizeContentFlow',
    inputSchema: SummarizeContentInputSchema,
    outputSchema: SummarizeContentOutputSchema,
  },
  async input => {
    const {output} = await summarizeContentPrompt(input);
    return output!;
  }
);
