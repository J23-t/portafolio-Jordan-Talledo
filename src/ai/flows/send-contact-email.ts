
'use server';
/**
 * @fileOverview A flow for handling contact form submissions.
 *
 * - sendContactEmail - A function that processes the contact form data.
 * - ContactFormInput - The input type for the sendContactEmail function.
 * - ContactFormOutput - The return type for the sendContactEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message'),
  email: z.string().email().describe('The email of the person sending the message'),
  phone: z.string().optional().describe('The optional phone number of the person'),
  message: z.string().describe('The message content'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const ContactFormOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function sendContactEmail(input: ContactFormInput): Promise<ContactFormOutput> {
  return sendContactEmailFlow(input);
}

const sendContactEmailFlow = ai.defineFlow(
  {
    name: 'sendContactEmailFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    // In a real application, you would integrate an email sending service here (e.g., SendGrid, Resend).
    // For this example, we will just log the data to the server console.
    console.log('Received contact form submission:');
    console.log('Name:', input.name);
    console.log('Email:', input.email);
    if (input.phone) {
      console.log('Phone:', input.phone);
    }
    console.log('Message:', input.message);
    
    // Here, we could use another AI prompt to summarize the message or determine its intent,
    // but for now, we'll just confirm receipt.

    return {
      success: true,
      message: 'Contact form data received and logged on the server.',
    };
  }
);
