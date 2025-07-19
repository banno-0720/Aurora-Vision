"use client";

import Image from 'next/image';
import { Download, Sparkles } from 'lucide-react';
import type { GeneratedImage } from '@/app/page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface GalleryProps {
  images: GeneratedImage[];
}

export function Gallery({ images }: GalleryProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-muted-foreground border-2 border-dashed rounded-lg p-12 min-h-[400px] bg-card">
        <Sparkles className="w-16 h-16 mb-4 text-primary" />
        <h3 className="text-xl font-semibold text-foreground">Your gallery is empty</h3>
        <p className="mt-2">Start creating to see your images appear here.</p>
      </div>
    );
  }

  const handleDownload = (url: string, prompt: string) => {
    const link = document.createElement('a');
    link.href = url;
    const filename = prompt.replace(/[^a-z0-9]/gi, '_').toLowerCase().slice(0, 50);
    link.download = `${filename || 'aurora-vision-art'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden group relative">
            <CardContent className="p-0">
              <Image
                src={image.url}
                alt={image.prompt}
                width={512}
                height={512}
                className="w-full h-auto aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </CardContent>
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardFooter className="p-3 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-0 w-full flex items-center justify-between">
              <p className="text-xs text-primary-foreground truncate flex-1 mr-2" title={image.basePrompt}>
                {image.basePrompt}
              </p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-sm" onClick={() => handleDownload(image.url, image.basePrompt)}>
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download</p>
                </TooltipContent>
              </Tooltip>
            </CardFooter>
          </Card>
        ))}
      </div>
    </TooltipProvider>
  );
}