
import { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileUploadProps {
  bucket: string;
  path?: string;
  onUpload: (url: string) => void;
  accept?: string;
  maxSize?: number; // in MB
  className?: string;
}

const FileUpload = ({ 
  bucket, 
  path = "", 
  onUpload, 
  accept = "image/*", 
  maxSize = 5,
  className = ""
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const uploadFile = async (file: File) => {
    try {
      setUploading(true);

      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        throw new Error(`File size must be less than ${maxSize}MB`);
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${path}${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from(bucket).getPublicUrl(fileName);
      
      onUpload(data.publicUrl);
      
      toast({
        title: "Success",
        description: "File uploaded successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload file.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      uploadFile(files[0]);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        dragActive ? 'border-purple-400 bg-purple-400/10' : 'border-gray-600'
      } ${className}`}
      onDragEnter={() => setDragActive(true)}
      onDragLeave={() => setDragActive(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={handleChange}
        accept={accept}
        disabled={uploading}
        className="hidden"
        id="file-upload"
      />
      
      <label
        htmlFor="file-upload"
        className="cursor-pointer flex flex-col items-center space-y-2"
      >
        {uploading ? (
          <Loader2 className="h-8 w-8 text-purple-400 animate-spin" />
        ) : (
          <Upload className="h-8 w-8 text-purple-400" />
        )}
        
        <div className="text-gray-300">
          <p className="font-medium">
            {uploading ? "Uploading..." : "Click to upload or drag and drop"}
          </p>
          <p className="text-sm text-gray-400">
            {accept.includes('image') ? 'Images' : 'Files'} up to {maxSize}MB
          </p>
        </div>
      </label>
    </div>
  );
};

export default FileUpload;
