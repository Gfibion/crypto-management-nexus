
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FileUpload from "./FileUpload";

interface ImageUploadProps {
  bucket: string;
  currentImageUrl?: string;
  onImageUpdate: (url: string) => void;
  onImageRemove?: () => void;
  path?: string;
  className?: string;
}

const ImageUpload = ({ 
  bucket, 
  currentImageUrl, 
  onImageUpdate, 
  onImageRemove,
  path = "",
  className = ""
}: ImageUploadProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {currentImageUrl && (
        <div className="relative inline-block">
          <img
            src={currentImageUrl}
            alt="Preview"
            className="max-w-xs max-h-48 rounded-lg object-cover"
          />
          {onImageRemove && (
            <Button
              size="sm"
              variant="destructive"
              className="absolute top-2 right-2"
              onClick={onImageRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}
      
      <FileUpload
        bucket={bucket}
        path={path}
        onUpload={onImageUpdate}
        accept="image/*"
        maxSize={5}
      />
    </div>
  );
};

export default ImageUpload;
