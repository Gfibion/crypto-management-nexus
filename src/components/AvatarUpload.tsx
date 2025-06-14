
import { useState } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AvatarUploadProps {
  userId: string;
  currentAvatarUrl?: string | null;
  onAvatarUpdate: (url: string) => void;
  size?: "sm" | "lg";
}

const AvatarUpload = ({ userId, currentAvatarUrl, onAvatarUpdate, size = "lg" }: AvatarUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const avatarSize = size === "lg" ? "w-32 h-32" : "w-20 h-20";
  const iconSize = size === "lg" ? "h-8 w-8" : "h-5 w-5";

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        return;
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}/avatar.${fileExt}`;

      // Delete old avatar if it exists
      if (currentAvatarUrl) {
        const oldPath = currentAvatarUrl.split('/').pop();
        if (oldPath) {
          await supabase.storage.from('avatars').remove([`${userId}/${oldPath}`]);
        }
      }

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
      
      // Update the profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      onAvatarUpdate(data.publicUrl);
      
      toast({
        title: "Success",
        description: "Profile picture updated successfully!",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload profile picture.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const getAvatarDisplay = () => {
    if (currentAvatarUrl) {
      return (
        <img
          src={currentAvatarUrl}
          alt="Profile"
          className={`${avatarSize} rounded-full object-cover`}
        />
      );
    }
    
    const initial = userId.charAt(0).toUpperCase();
    return (
      <div className={`${avatarSize} bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center`}>
        <span className="text-white text-2xl font-bold">{initial}</span>
      </div>
    );
  };

  return (
    <div className="relative inline-block">
      {getAvatarDisplay()}
      
      <label
        htmlFor="avatar-upload"
        className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 cursor-pointer transition-colors"
      >
        {uploading ? (
          <Loader2 className={`${iconSize} animate-spin`} />
        ) : (
          <Camera className={iconSize} />
        )}
      </label>
      
      <input
        id="avatar-upload"
        type="file"
        accept="image/*"
        onChange={uploadAvatar}
        disabled={uploading}
        className="hidden"
      />
    </div>
  );
};

export default AvatarUpload;
