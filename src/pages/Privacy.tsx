import SEOHead from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Cookie, Link2, Bell, FileText, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  const lastUpdated = "December 15, 2024";

  return (
    <>
      <SEOHead
        title="Privacy Policy - Gfibion Joseph Mutua | Data Protection & User Privacy"
        description="Learn how Gfibion Joseph Mutua's professional portfolio website collects, uses, and protects your personal information. Our commitment to your privacy and data security."
        keywords="privacy policy, data protection, user privacy, cookies, GDPR, data security, personal information, Gfibion Joseph Mutua"
        canonical="https://josephmgfibion.org/privacy"
      />
      <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-900/30 px-4 py-2 rounded-full mb-6 border border-purple-600/30">
              <Shield className="h-4 w-4 text-purple-400" />
              <span className="text-sm text-purple-300">Your Privacy Matters</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
            <p className="text-gray-400">
              Last updated: {lastUpdated}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <Card className="bg-slate-800/40 border-purple-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <FileText className="h-5 w-5 text-purple-400" />
                  Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  Welcome to the professional portfolio website of Gfibion Joseph Mutua. I am committed to protecting 
                  your privacy and ensuring the security of your personal information. This Privacy Policy explains 
                  how I collect, use, store, and protect your data when you visit this website.
                </p>
                <p>
                  By using this website, you consent to the practices described in this Privacy Policy. I encourage 
                  you to read this document carefully to understand how your information is handled.
                </p>
              </CardContent>
            </Card>

            {/* Information Collection */}
            <Card className="bg-slate-800/40 border-purple-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>I may collect the following types of information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Personal Information:</strong> Name, email address, and any other information you voluntarily provide through contact forms or chat features.</li>
                  <li><strong className="text-white">Usage Data:</strong> Information about how you interact with the website, including pages visited, time spent, and navigation patterns.</li>
                  <li><strong className="text-white">Technical Data:</strong> IP address, browser type, device information, and operating system for website optimization and security purposes.</li>
                  <li><strong className="text-white">Account Information:</strong> If you create an account, I collect registration details to provide personalized services.</li>
                </ul>
              </CardContent>
            </Card>

            {/* Use of Cookies */}
            <Card className="bg-slate-800/40 border-purple-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Cookie className="h-5 w-5 text-purple-400" />
                  Use of Cookies
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  This website uses cookies and similar tracking technologies to enhance your browsing experience. 
                  Cookies are small text files stored on your device that help me:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Understand how you navigate and use the website</li>
                  <li>Improve website performance and functionality</li>
                  <li>Provide personalized content and recommendations</li>
                  <li>Analyze website traffic through Google Analytics</li>
                </ul>
                <p className="mt-4">
                  You can control cookie settings through your browser preferences. However, disabling certain 
                  cookies may affect your experience on this website.
                </p>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card className="bg-slate-800/40 border-purple-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Bell className="h-5 w-5 text-purple-400" />
                  How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>Your information is used to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Respond to your inquiries and messages through the chat feature</li>
                  <li>Provide and improve website services and content</li>
                  <li>Send notifications about updates, if you have opted in</li>
                  <li>Analyze website usage to enhance user experience</li>
                  <li>Ensure website security and prevent fraudulent activities</li>
                  <li>Comply with legal obligations and protect rights</li>
                </ul>
                <p className="mt-4">
                  I do not sell, trade, or rent your personal information to third parties. Your data is treated 
                  with the utmost confidentiality and respect.
                </p>
              </CardContent>
            </Card>

            {/* Third-Party Services */}
            <Card className="bg-slate-800/40 border-purple-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Link2 className="h-5 w-5 text-purple-400" />
                  Third-Party Services & Links
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>This website may integrate with or contain links to third-party services, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Google Analytics:</strong> For website traffic analysis and insights</li>
                  <li><strong className="text-white">Google Tag Manager:</strong> For managing website tags and tracking</li>
                  <li><strong className="text-white">Supabase:</strong> For secure authentication and data storage</li>
                  <li><strong className="text-white">Social Media Platforms:</strong> For content sharing features</li>
                </ul>
                <p className="mt-4">
                  I am not responsible for the privacy practices of external websites. I recommend reviewing 
                  the privacy policies of any third-party services you interact with through this website.
                </p>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card className="bg-slate-800/40 border-purple-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Shield className="h-5 w-5 text-purple-400" />
                  Data Security
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  I implement appropriate technical and organizational measures to protect your personal 
                  information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Secure HTTPS encryption for all data transmission</li>
                  <li>Row-level security policies for database access</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal data on a need-to-know basis</li>
                </ul>
                <p className="mt-4">
                  While I strive to protect your information, no method of transmission over the Internet 
                  is 100% secure. I cannot guarantee absolute security but am committed to maintaining 
                  industry-standard protections.
                </p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card className="bg-slate-800/40 border-purple-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <FileText className="h-5 w-5 text-purple-400" />
                  Your Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong className="text-white">Access:</strong> Request a copy of your personal data held by this website</li>
                  <li><strong className="text-white">Correction:</strong> Request correction of inaccurate or incomplete data</li>
                  <li><strong className="text-white">Deletion:</strong> Request deletion of your personal data, subject to legal requirements</li>
                  <li><strong className="text-white">Opt-out:</strong> Unsubscribe from marketing communications or notifications</li>
                  <li><strong className="text-white">Portability:</strong> Request your data in a portable format</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, please contact me through the{" "}
                  <Link to="/chat" className="text-purple-400 hover:text-purple-300 underline">
                    chat feature
                  </Link>{" "}
                  or contact form.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Policy */}
            <Card className="bg-slate-800/40 border-purple-800/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Bell className="h-5 w-5 text-purple-400" />
                  Changes to This Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  I reserve the right to update this Privacy Policy at any time to reflect changes in 
                  practices, technologies, legal requirements, or other factors. When changes are made:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>The "Last updated" date at the top will be revised</li>
                  <li>Significant changes may be announced through website notifications</li>
                  <li>Your continued use of the website after changes constitutes acceptance</li>
                </ul>
                <p className="mt-4">
                  I encourage you to periodically review this page to stay informed about how your 
                  information is protected.
                </p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 border-purple-600/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <Mail className="h-5 w-5 text-purple-400" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="text-gray-300 space-y-4">
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy Policy or 
                  how your data is handled, please don't hesitate to reach out:
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Link
                    to="/chat"
                    className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <Mail className="h-4 w-4" />
                    Contact via Chat
                  </Link>
                  <Link
                    to="/about"
                    className="inline-flex items-center justify-center gap-2 border border-purple-400/50 text-purple-400 hover:bg-purple-400/10 px-6 py-3 rounded-lg transition-colors"
                  >
                    Learn More About Me
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-12 text-gray-500 text-sm">
            <p>
              This Privacy Policy applies to josephmgfibion.org and all associated services.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy;
