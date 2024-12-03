import { useState } from "react";
import { Button } from "@nextui-org/react";
import { Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ImageUploadProps {
  currentImage?: string;
  onImageUpload: (url: string) => void;
}

export function ImageUpload({ currentImage, onImageUpload }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const uploadImage = async (file: File) => {
    try {
      setIsUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `profile-photos/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('cv-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('cv-images')
        .getPublicUrl(filePath);

      onImageUpload(publicUrl);
      toast.success('Profile photo uploaded successfully');
    } catch (error) {
      toast.error('Error uploading image');
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('File size should be less than 5MB');
        return;
      }
      uploadImage(file);
    }
  };

  const removeImage = () => {
    onImageUpload('');
    toast.success('Profile photo removed');
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {currentImage ? (
        <div className="relative">
          <img
            src={currentImage}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover"
          />
          <Button
            isIconOnly
            size="sm"
            color="danger"
            variant="flat"
            className="absolute -top-2 -right-2"
            onClick={removeImage}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
          <Upload className="w-8 h-8 text-muted-foreground" />
        </div>
      )}
      
      <div className="flex gap-2">
        <Button
          as="label"
          color="primary"
          variant="flat"
          size="sm"
          isLoading={isUploading}
          className="cursor-pointer"
        >
          {currentImage ? 'Change Photo' : 'Upload Photo'}
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </Button>
      </div>
    </div>
  );
}