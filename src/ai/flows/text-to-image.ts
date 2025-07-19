'use server';

/**
 * @fileOverview Implements the text-to-image generation flow.
 *
 * - textToImage - A function that generates an image based on a text prompt.
 * - TextToImageInput - The input type for the textToImage function.
 * - TextToImageOutput - The return type for the textToImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TextToImageInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate the image from.'),
});
export type TextToImageInput = z.infer<typeof TextToImageInputSchema>;

const TextToImageOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated image.'),
});
export type TextToImageOutput = z.infer<typeof TextToImageOutputSchema>;

export async function textToImage(input: TextToImageInput): Promise<TextToImageOutput> {
  return textToImageFlow(input);
}

const textToImageFlow = ai.defineFlow(
  {
    name: 'textToImageFlow',
    inputSchema: TextToImageInputSchema,
    outputSchema: TextToImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      // IMPORTANT: ONLY the googleai/gemini-2.0-flash-preview-image-generation model is able to generate images. You MUST use exactly this model to generate images.
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: input.prompt,
      config: {
        responseModalities: ['TEXT', 'IMAGE'], // MUST provide both TEXT and IMAGE, IMAGE only won't work
      },
    });

    if (!media?.url) {
      throw new Error('No image URL returned from the image generation model.');
    }

    return {imageUrl: media.url};
  }
);