"use client";

import { useState } from 'react';
import { Gallery } from '@/components/gallery';
import Header from '@/components/header';
import ImageToImageForm from '@/components/image-to-image-form';
import TextToImageForm from '@/components/text-to-image-form';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type GeneratedImage = {
  id: string;
  url: string;
  prompt: string;
  basePrompt: string;
};

export default function Home() {
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);

  const handleImageGenerated = (image: GeneratedImage) => {
    setGeneratedImages((prevImages) => [image, ...prevImages]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 xl:col-span-3">
            <Card className="sticky top-8">
              <CardContent className="p-4 md:p-6">
                <Tabs defaultValue="text-to-image" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="text-to-image">Text-to-Image</TabsTrigger>
                    <TabsTrigger value="image-to-image">Image-to-Image</TabsTrigger>
                  </TabsList>
                  <TabsContent value="text-to-image">
                    <TextToImageForm onImageGenerated={handleImageGenerated} />
                  </TabsContent>
                  <TabsContent value="image-to-image">
                    <ImageToImageForm onImageGenerated={handleImageGenerated} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">Gallery</h2>
            </div>
            <Separator className="mb-8" />
            <Gallery images={generatedImages} />
          </div>
        </div>
      </main>
    </div>
  );
}