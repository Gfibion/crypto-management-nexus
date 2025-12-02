import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  MessageCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SocialShareProps {
  url?: string;
  title?: string;
  description?: string;
  hashtags?: string[];
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

const SocialShare: React.FC<SocialShareProps> = ({
  url,
  title = "Check out this page!",
  description = "",
  hashtags = [],
  className = "",
  variant = "outline",
  size = "default"
}) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  
  // Use current page URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const hashtagString = hashtags.join(',');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${hashtagString ? `&hashtags=${hashtagString}` : ''}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleShare = (platform: string) => {
    const link = shareLinks[platform as keyof typeof shareLinks];
    if (link) {
      window.open(link, '_blank', 'width=600,height=400,noopener,noreferrer');
      setIsOpen(false);
      toast({
        title: "Sharing...",
        description: `Opening ${platform} share dialog`,
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share link copied to clipboard",
      });
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: description,
          url: shareUrl,
        });
        setIsOpen(false);
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or failed:', error);
      }
    } else {
      // Fallback to showing menu if native share not supported
      setIsOpen(true);
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-slate-800 border-slate-700">
        <DropdownMenuItem
          onClick={() => handleShare('facebook')}
          className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700 text-gray-200"
        >
          <Facebook className="h-4 w-4 mr-2 text-blue-500" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleShare('twitter')}
          className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700 text-gray-200"
        >
          <Twitter className="h-4 w-4 mr-2 text-sky-400" />
          Share on X (Twitter)
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleShare('linkedin')}
          className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700 text-gray-200"
        >
          <Linkedin className="h-4 w-4 mr-2 text-blue-600" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleShare('whatsapp')}
          className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700 text-gray-200"
        >
          <MessageCircle className="h-4 w-4 mr-2 text-green-500" />
          Share on WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleCopyLink}
          className="cursor-pointer hover:bg-slate-700 focus:bg-slate-700 text-gray-200"
        >
          <Link2 className="h-4 w-4 mr-2 text-purple-400" />
          Copy Link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialShare;
