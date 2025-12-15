import { Link } from "react-router-dom";
import { Shield, FileText, Mail, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900/80 border-t border-purple-800/30 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="text-gray-400 text-sm text-center md:text-left">
            <p>&copy; {currentYear} Gfibion Joseph Mutua. All rights reserved.</p>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link
              to="/privacy"
              className="flex items-center gap-1.5 text-gray-400 hover:text-purple-400 transition-colors text-sm"
            >
              <Shield className="h-4 w-4" />
              Privacy Policy
            </Link>
            <Link
              to="/chat"
              className="flex items-center gap-1.5 text-gray-400 hover:text-purple-400 transition-colors text-sm"
            >
              <Mail className="h-4 w-4" />
              Contact
            </Link>
            <a
              href="https://josephmgfibion.org/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-gray-400 hover:text-purple-400 transition-colors text-sm"
            >
              <FileText className="h-4 w-4" />
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
