import { Link } from "react-router-dom";
import { ArrowLeft, FileText, Shield, AlertTriangle, Scale, Users, Globe, Mail } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";

const Terms = () => {
  return (
    <>
      <SEOHead
        title="Terms of Service | Gfibion Joseph Mutua"
        description="Read the terms and conditions governing the use of Gfibion Joseph Mutua's website and services."
        canonical="https://josephmgfibion.org/terms"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600/20 rounded-full mb-6">
              <Scale className="h-8 w-8 text-purple-400" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-400">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Introduction */}
            <section className="bg-slate-800/50 rounded-xl p-6 border border-purple-800/30">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">1. Introduction & Acceptance</h2>
              </div>
              <div className="text-gray-300 space-y-3">
                <p>
                  Welcome to the website of Gfibion Joseph Mutua. By accessing or using this website and its services, you agree to be bound by these Terms of Service and all applicable laws and regulations.
                </p>
                <p>
                  If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained on this website are protected by applicable copyright and trademark law.
                </p>
                <p>
                  These Terms of Service constitute a legally binding agreement between you ("User," "you," or "your") and Gfibion Joseph Mutua ("we," "us," or "our") concerning your access to and use of this website.
                </p>
              </div>
            </section>

            {/* User Responsibilities */}
            <section className="bg-slate-800/50 rounded-xl p-6 border border-purple-800/30">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">2. User Responsibilities</h2>
              </div>
              <div className="text-gray-300 space-y-3">
                <p>As a user of this website, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information when creating an account or submitting forms</li>
                  <li>Maintain the security and confidentiality of your account credentials</li>
                  <li>Use the website only for lawful purposes and in accordance with these Terms</li>
                  <li>Not engage in any activity that interferes with or disrupts the website's functionality</li>
                  <li>Not attempt to gain unauthorized access to any portion of the website or its systems</li>
                  <li>Not use automated systems or software to extract data from the website without permission</li>
                  <li>Respect the intellectual property rights of the website owner and third parties</li>
                </ul>
              </div>
            </section>

            {/* Account Terms */}
            <section className="bg-slate-800/50 rounded-xl p-6 border border-purple-800/30">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">3. Account Terms</h2>
              </div>
              <div className="text-gray-300 space-y-3">
                <p>
                  When you create an account on our website, you must provide accurate and complete information. You are responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Safeguarding your password and any activities or actions under your account</li>
                  <li>Notifying us immediately of any unauthorized use of your account</li>
                  <li>Ensuring your account information remains current and accurate</li>
                </ul>
                <p>
                  We reserve the right to suspend or terminate your account if we believe you have violated these Terms or engaged in fraudulent or illegal activities.
                </p>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="bg-slate-800/50 rounded-xl p-6 border border-purple-800/30">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">4. Intellectual Property</h2>
              </div>
              <div className="text-gray-300 space-y-3">
                <p>
                  All content on this website, including but not limited to text, graphics, logos, images, audio clips, digital downloads, and software, is the property of Gfibion Joseph Mutua or its content suppliers and is protected by international copyright laws.
                </p>
                <p>
                  You may not:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Reproduce, distribute, or publicly display any content without prior written permission</li>
                  <li>Modify or create derivative works based on our content</li>
                  <li>Use any content for commercial purposes without explicit authorization</li>
                  <li>Remove or alter any copyright or proprietary notices</li>
                </ul>
              </div>
            </section>

            {/* User Content */}
            <section className="bg-slate-800/50 rounded-xl p-6 border border-purple-800/30">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">5. User-Generated Content</h2>
              </div>
              <div className="text-gray-300 space-y-3">
                <p>
                  When you submit content to our website (comments, testimonials, messages, etc.), you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, and display such content in connection with our services.
                </p>
                <p>
                  You represent and warrant that:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You own or have the necessary rights to submit the content</li>
                  <li>Your content does not infringe upon the rights of any third party</li>
                  <li>Your content is not defamatory, obscene, or otherwise unlawful</li>
                </ul>
                <p>
                  We reserve the right to remove any user-generated content that violates these Terms or is deemed inappropriate at our sole discretion.
                </p>
              </div>
            </section>

            {/* Services */}
            <section className="bg-slate-800/50 rounded-xl p-6 border border-purple-800/30">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">6. Services & Consultations</h2>
              </div>
              <div className="text-gray-300 space-y-3">
                <p>
                  Professional services offered through this website are subject to separate agreements that will be provided upon engagement. These Terms govern your use of the website, not the provision of professional services.
                </p>
                <p>
                  For any professional services, including but not limited to IT consulting, web development, and AI solutions, specific terms, deliverables, timelines, and fees will be agreed upon in writing before work commences.
                </p>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="bg-slate-800/50 rounded-xl p-6 border border-purple-800/30">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                <h2 className="text-xl font-semibold text-white">7. Disclaimers & Limitations</h2>
              </div>
              <div className="text-gray-300 space-y-3">
                <p>
                  <strong className="text-white">Disclaimer of Warranties:</strong> This website and its contents are provided "as is" and "as available" without any warranties of any kind, either express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, or non-infringement.
                </p>
                <p>
                  <strong className="text-white">Limitation of Liability:</strong> In no event shall Gfibion Joseph Mutua be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising out of or relating to your use of this website.
                </p>
                <p>
                  <strong className="text-white">Accuracy of Information:</strong> While we strive to provide accurate and up-to-date information, we make no representations or warranties about the accuracy, reliability, completeness, or timeliness of the content on this website.
                </p>
              </div>
            </section>

            {/* Modifications */}
            <section className="bg-slate-800/50 rounded-xl p-6 border border-purple-800/30">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">8. Modifications to Terms</h2>
              </div>
              <div className="text-gray-300 space-y-3">
                <p>
                  We reserve the right to modify these Terms of Service at any time without prior notice. Changes will be effective immediately upon posting to this page. Your continued use of the website after any changes constitutes your acceptance of the new Terms.
                </p>
                <p>
                  We recommend reviewing these Terms periodically to stay informed of any updates. The "Last updated" date at the top of this page indicates when the Terms were last revised.
                </p>
              </div>
            </section>

            {/* Governing Law */}
            <section className="bg-slate-800/50 rounded-xl p-6 border border-purple-800/30">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">9. Governing Law</h2>
              </div>
              <div className="text-gray-300 space-y-3">
                <p>
                  These Terms of Service shall be governed by and construed in accordance with the laws of Kenya, without regard to its conflict of law provisions.
                </p>
                <p>
                  Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts located in Kenya.
                </p>
              </div>
            </section>

            {/* Contact */}
            <section className="bg-slate-800/50 rounded-xl p-6 border border-purple-800/30">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="h-5 w-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">10. Contact Information</h2>
              </div>
              <div className="text-gray-300 space-y-3">
                <p>
                  If you have any questions about these Terms of Service, please contact us through:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Our{" "}
                    <Link to="/chat" className="text-purple-400 hover:text-purple-300 underline">
                      Chat page
                    </Link>
                  </li>
                  <li>Email: contact@josephmgfibion.org</li>
                </ul>
              </div>
            </section>

            {/* Related Links */}
            <div className="flex flex-wrap gap-4 justify-center pt-8">
              <Link
                to="/privacy"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg transition-colors"
              >
                <Shield className="h-4 w-4" />
                Privacy Policy
              </Link>
              <Link
                to="/chat"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-lg transition-colors"
              >
                <Mail className="h-4 w-4" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Terms;
