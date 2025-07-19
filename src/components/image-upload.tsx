"use client";

import { useState } from 'react';
import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useFormField } from '@/components/ui/form';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageChange: (dataUri: string) => void;
  onImageRemove: () => void;
}

export function ImageUpload({ onImageChange, onImageRemove }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const { error } = useFormField();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setPreview(dataUri);
        onImageChange(dataUri);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageRemove();
    const input = document.getElementById('image-upload-input') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  };

  return (
    <div className="space-y-2">
      {preview ? (
        <div className="relative group">
          <Image
            src={preview}
            alt="Image preview"
            width={400}
            height={400}
            className="rounded-lg object-cover w-full aspect-square border"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity rounded-full h-8 w-8"
            onClick={handleRemoveImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label
          htmlFor="image-upload-input"
          className={cn(
            "flex flex-col justify-center items-center w-full aspect-square border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
            "hover:border-primary hover:bg-primary/5",
            error ? "border-destructive" : "border-border"
          )}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <UploadCloud className="w-8 h-8" />
            <span>Upload an image</span>
            <p className="text-xs">PNG or JPG</p>
            <input
              id="image-upload-input"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </div>
        </label>
      )}
    </div>
  );
}