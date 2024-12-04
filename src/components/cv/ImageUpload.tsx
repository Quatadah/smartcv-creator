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

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError, data } = await supabase.storage
        .from("cv-images")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("cv-images").getPublicUrl(filePath);

      onImageUpload(publicUrl);
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Error uploading image");
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onImageUpload("");
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
            color="danger"
            variant="flat"
            size="sm"
            className="absolute -top-2 -right-2"
            onClick={handleRemoveImage}
          >
            <X size={16} />
          </Button>
        </div>
      ) : (
        <div className="w-32 h-32 rounded-full bg-default-100 flex items-center justify-center">
          <Upload className="w-8 h-8 text-default-500" />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
        id="image-upload"
        disabled={isUploading}
      />
      <label htmlFor="image-upload">
        <Button
          as="span"
          color="primary"
          variant="flat"
          isLoading={isUploading}
          className="cursor-pointer"
        >
          {currentImage ? "Change Photo" : "Upload Photo"}
        </Button>
      </label>
    </div>
  );
}