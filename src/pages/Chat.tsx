
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useContactSubmit } from "@/hooks/useSupabaseData";
import { useGuestMode } from "@/hooks/useGuestMode";
import GuestModePrompt from "@/components/GuestModePrompt";
import { Send, MessageCircle, Mail, User, Lock } from "lucide-react";

const Chat = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const { submitContactForm } = useContactSubmit();
  const { toast } = useToast();
  const { showPrompt, pendingAction, requireAuth, closePrompt, isAuthenticated } = useGuestMode();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!requireAuth("send a message")) {
      return;
    }

    setLoading(true);
    try {
      await submitContactForm(formData);
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your vision to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-purple-400" />
                Send a Message
                {!isAuthenticated && (
                  <Lock className="h-4 w-4 text-yellow-400 ml-2" title="Authentication required" />
                )}
              </CardTitle>
              {!isAuthenticated && (
                <p className="text-sm text-yellow-400">
                  Sign in to send messages and get priority responses
                </p>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <User className="h-4 w-4 inline mr-1" />
                      Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                      className="bg-slate-700 border-purple-600/30 text-white placeholder-gray-400"
                      disabled={!isAuthenticated}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                      className="bg-slate-700 border-purple-600/30 text-white placeholder-gray-400"
                      disabled={!isAuthenticated}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief subject of your message"
                    className="bg-slate-700 border-purple-600/30 text-white placeholder-gray-400"
                    disabled={!isAuthenticated}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, goals, or questions..."
                    rows={6}
                    required
                    className="bg-slate-700 border-purple-600/30 text-white placeholder-gray-400"
                    disabled={!isAuthenticated}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0"
                  disabled={loading || !isAuthenticated}
                >
                  {loading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-slate-800/50 border-purple-800/30">
              <CardHeader>
                <CardTitle className="text-xl text-white">Why Work With Me?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-purple-300 font-semibold">Strategic Approach</h3>
                    <p className="text-gray-400 text-sm">Data-driven solutions tailored to your business objectives</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-blue-300 font-semibold">Proven Results</h3>
                    <p className="text-gray-400 text-sm">Track record of successful implementations and growth</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                  <div>
                    <h3 className="text-green-300 font-semibold">Future-Ready</h3>
                    <p className="text-gray-400 text-sm">Cutting-edge technology integration including Web3 and AI</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-600/30">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-4">Ready to Transform Your Business?</h3>
                <p className="text-gray-300 mb-6">
                  Join the growing number of businesses leveraging modern technology for competitive advantage.
                </p>
                <div className="text-3xl font-bold text-purple-400 mb-2">24-48h</div>
                <p className="text-sm text-gray-400">Average response time for all inquiries</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <GuestModePrompt 
          isOpen={showPrompt}
          onClose={closePrompt}
          actionName={pendingAction}
        />
      </div>
    </div>
  );
};

export default Chat;
