
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Chat = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [chatMessages, setChatMessages] = useState([
    {
      type: "bot",
      message: "Hello! I'm here to help you with any questions about business management, ICT solutions, or blockchain technology. How can I assist you today?",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for your message. I'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage.trim()) return;

    // Add user message
    const userMessage = {
      type: "user",
      message: currentMessage,
      timestamp: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const responses = [
        "Thanks for your question! I'd be happy to discuss this further. Would you like to schedule a consultation?",
        "That's an interesting point about blockchain technology. Let me share some insights based on my experience.",
        "Great question about business management! This is definitely something we can explore in detail.",
        "ICT solutions are crucial for modern businesses. I can help you develop a comprehensive strategy.",
        "I appreciate your interest in crypto and Web3. There are many opportunities in this space."
      ];
      
      const botMessage = {
        type: "bot",
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString()
      };

      setChatMessages(prev => [...prev, botMessage]);
    }, 1000);

    setCurrentMessage("");
  };

  const contactInfo = [
    { label: "Email", value: "business@example.com", type: "email" },
    { label: "Phone", value: "+1 (555) 123-4567", type: "phone" },
    { label: "LinkedIn", value: "linkedin.com/in/businessmanager", type: "social" },
    { label: "Location", value: "Available Worldwide", type: "location" }
  ];

  const quickTopics = [
    "Business Consulting",
    "ICT Solutions",
    "Blockchain Strategy",
    "Project Management",
    "Digital Transformation",
    "Crypto Advisory"
  ];

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to transform your business? Let's discuss your needs and explore how we can work together
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Chat Section */}
          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center gap-2">
                💬 Live Chat
                <Badge variant="secondary" className="bg-green-800/30 text-green-300">Online</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Chat Messages */}
              <div className="h-80 overflow-y-auto mb-4 space-y-4 p-4 bg-slate-900/30 rounded-lg">
                {chatMessages.map((msg, index) => (
                  <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      msg.type === 'user' 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                        : 'bg-slate-700 text-gray-300'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs opacity-70 mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Topics */}
              <div className="mb-4">
                <p className="text-sm text-gray-400 mb-2">Quick topics:</p>
                <div className="flex flex-wrap gap-2">
                  {quickTopics.map((topic, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="border-purple-400/30 text-purple-300 cursor-pointer hover:bg-purple-400/20 transition-colors text-xs"
                      onClick={() => setCurrentMessage(topic)}
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Chat Input */}
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-700 border-purple-600/30 text-white placeholder-gray-400"
                />
                <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                  Send
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <Card className="bg-slate-800/50 border-purple-800/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white">📧 Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="bg-slate-700 border-purple-600/30 text-white placeholder-gray-400"
                  />
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="bg-slate-700 border-purple-600/30 text-white placeholder-gray-400"
                  />
                </div>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  required
                  className="bg-slate-700 border-purple-600/30 text-white placeholder-gray-400"
                />
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your message..."
                  rows={6}
                  required
                  className="bg-slate-700 border-purple-600/30 text-white placeholder-gray-400 resize-none"
                />
                <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="bg-slate-800/50 border-purple-800/30 mb-16">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300">
                  <h3 className="font-semibold text-purple-300 mb-2">{info.label}</h3>
                  <p className="text-gray-300 text-sm">{info.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Response Time */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-600/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Quick Response Guarantee</h2>
            <p className="text-xl text-gray-300 mb-6">
              I typically respond within 2-4 hours during business hours, and within 24 hours otherwise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-400">
              <span>📧 Email: Within 24 hours</span>
              <span>💬 Chat: Real-time during business hours</span>
              <span>📞 Call: Available by appointment</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
