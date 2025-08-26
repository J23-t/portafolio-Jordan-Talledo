'use server';

/**
 * @fileOverview AI-powered content summarization flow.
 *
 * - summarizeContent - A function that summarizes content based on user input (URL, article, or text).
 * - SummarizeContentInput - The input type for the summarizeContent function.
 * - SummarizeContentOutput - The return type for the summarizeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeContentInputSchema = z.object({
  content: z.string().describe('The content to summarize (URL, article text, etc.)'),
});
export type SummarizeContentInput = z.infer<typeof SummarizeContentInputSchema>;

const SummarizeContentOutputSchema = z.object({
  summary: z.string().describe('A summary of the content, focusing on relevance to Jordan Talledo\'s expertise.'),
});
export type SummarizeContentOutput = z.infer<typeof SummarizeContentOutputSchema>;

export async function summarizeContent(input: SummarizeContentInput): Promise<SummarizeContentOutput> {
  return summarizeContentFlow(input);
}

const summarizeContentPrompt = ai.definePrompt({
  name: 'summarizeContentPrompt',
  input: {schema: SummarizeContentInputSchema},
  output: {schema: SummarizeContentOutputSchema},
  prompt: `You are an AI assistant tasked with summarizing content and identifying key takeaways relevant to Jordan Talledo, a developer with expertise in Next.js, Kotlin, Flutter, HTML, CSS, TypeScript, Tailwind CSS, SQL Server, and MongoDB.\n\n  Summarize the following content, focusing on aspects that highlight opportunities for Jordan Talledo's skills or potential services he could offer. The summary should be concise and informative for visitors to Jordan's portfolio.\n\n  Content: {{{content}}}`,
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
