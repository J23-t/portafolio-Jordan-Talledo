
'use server';
/**
 * @fileOverview A flow for handling contact form submissions and sending emails.
 *
 * - sendContactEmail - A function that processes contact data and sends an email.
 * - ContactFormInput - The input type for the sendContactEmail function.
 * - ContactFormOutput - The return type for the sendContactEmail function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Resend } from 'resend';

const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person sending the message'),
  email: z.string().email().describe('The email of the person sending the message'),
  phone: z.string().optional().describe('The optional phone number of the person'),
  message: z.string().describe('The message content, often a conversation history'),
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
    console.log('Received contact submission:', input);

    const resend = new Resend(process.env.RESEND_API_KEY);
    const myEmail = 'programadortalledo@gmail.com';

    try {
      const { data, error } = await resend.emails.send({
        from: 'Portfolio Assistant <onboarding@resend.dev>', // Must be a verified domain on Resend
        to: [myEmail],
        subject: `New Project Lead: ${input.name}`,
        html: `
          <h1>New Project Inquiry</h1>
          <p>You have a new lead from your portfolio's AI Assistant.</p>
          <hr>
          <h2>Contact Details:</h2>
          <ul>
            <li><strong>Name:</strong> ${input.name}</li>
            <li><strong>Email:</strong> ${input.email}</li>
            ${input.phone ? `<li><strong>Phone:</strong> ${input.phone}</li>` : ''}
          </ul>
          <hr>
          <h2>Conversation Summary:</h2>
          <pre style="white-space: pre-wrap; background-color: #f4f4f4; padding: 15px; border-radius: 5px;">${input.message}</pre>
        `,
      });

      if (error) {
        console.error('Resend error:', error);
        throw new Error(`Failed to send email: ${error.message}`);
      }
      
      console.log('Email sent successfully:', data);

      return {
        success: true,
        message: 'Email sent successfully via Resend.',
      };

    } catch(e) {
      const error = e as Error;
      console.error('Error sending email:', error.message);
      
      // Still return success to the UI form, but log the error server-side.
      // The AI flow will handle notifying the user if it was called as a tool.
      // The contact form will show its own success message.
      if (process.env.RESEND_API_KEY) {
        return { success: false, message: `Failed to send email. Check server logs. Is the 'from' address domain verified in Resend? Error: ${error.message}`};
      }
      return { success: false, message: 'Could not send email. RESEND_API_KEY is not configured.' };
    }
  }
);
