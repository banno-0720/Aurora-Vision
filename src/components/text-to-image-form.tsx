"use client";

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { textToImage } from '@/ai/flows/text-to-image';
import type { GeneratedImage } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  basePrompt: z.string().min(10, {
    message: 'Prompt must be at least 10 characters.',
  }),
  creativity: z.number().min(0).max(1),
});

type TextToImageFormProps = {
  onImageGenerated: (image: GeneratedImage) => void;
};

const promptSuggestions = ['Photorealistic', 'Synthwave', 'Steampunk', 'Low poly'];

export default function TextToImageForm({ onImageGenerated }: TextToImageFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      basePrompt: '',
      creativity: 0.5,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const fullPrompt = `${values.basePrompt}, with a creativity level of ${values.creativity.toFixed(2)}`;
      const result = await textToImage({ prompt: fullPrompt });
      if (result.imageUrl) {
        onImageGenerated({
          id: new Date().toISOString(),
          url: result.imageUrl,
          prompt: fullPrompt,
          basePrompt: values.basePrompt
        });
        form.reset({ basePrompt: '', creativity: 0.5 });
      } else {
        throw new Error('Image generation failed to return a URL.');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: error instanceof Error ? error.message : String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const appendSuggestion = (suggestion: string) => {
    const currentPrompt = form.getValues('basePrompt');
    form.setValue('basePrompt', currentPrompt ? `${currentPrompt}, ${suggestion}` : suggestion);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="basePrompt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prompt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A stunning castle on a floating island, digital art"
                  {...field}
                  rows={4}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-wrap gap-2">
          {promptSuggestions.map((suggestion) => (
            <Button key={suggestion} type="button" variant="outline" size="sm" onClick={() => appendSuggestion(suggestion)} disabled={isLoading}>
              {suggestion}
            </Button>
          ))}
        </div>
        <FormField
          control={form.control}
          name="creativity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Creativity ({field.value.toFixed(2)})</FormLabel>
              <FormControl>
                <Slider
                  min={0}
                  max={1}
                  step={0.05}
                  value={[field.value]}
                  onValueChange={(vals) => field.onChange(vals[0])}
                  disabled={isLoading}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full animate-button-glow" disabled={isLoading}>
          <Sparkles className="mr-2 h-4 w-4" />
          {isLoading ? 'Generating...' : 'Generate Image'}
        </Button>
      </form>
    </Form>
  );
}
