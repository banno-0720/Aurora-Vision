'use server';

/**
 * @fileOverview An AI agent that transforms an image based on a text prompt.
 *
 * - imageToImage - A function that handles the image transformation process.
 * - ImageToImageInput - The input type for the imageToImage function.
 * - ImageToImageOutput - The return type for the imageToImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImageToImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo to use as the basis for the transformation, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  prompt: z.string().describe('The prompt to use to transform the image.'),
});
export type ImageToImageInput = z.infer<typeof ImageToImageInputSchema>;

const ImageToImageOutputSchema = z.object({
  transformedImage: z.string().describe('The transformed image as a data URI.'),
});
export type ImageToImageOutput = z.infer<typeof ImageToImageOutputSchema>;

export async function imageToImage(input: ImageToImageInput): Promise<ImageToImageOutput> {
  return imageToImageFlow(input);
}

const imageToImagePrompt = ai.definePrompt({
  name: 'imageToImagePrompt',
  input: {schema: ImageToImageInputSchema},
  output: {schema: ImageToImageOutputSchema},
  prompt: [
    {media: {url: '{{{photoDataUri}}}'}},
    {text: 'Transform this image: {{{prompt}}}'},
  ],
  config: {
    responseModalities: ['TEXT', 'IMAGE'],
  },
});

const imageToImageFlow = ai.defineFlow(
  {
    name: 'imageToImageFlow',
    inputSchema: ImageToImageInputSchema,
    outputSchema: ImageToImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: input.photoDataUri}},
        {text: input.prompt},
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    return {transformedImage: media!.url};
  }
);