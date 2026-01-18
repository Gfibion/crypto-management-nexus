import { Link } from "react-router-dom";
import { Shield, FileText, Mail, Scale, Gavel } from "lucide-react";
import gfibionGenesisLogo from "@/assets/gfibion-genesis-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const linkBaseClasses = 
    "flex items-center gap-2 text-gray-300 hover:text-white focus:text-white " +
    "transition-colors text-sm font-medium rounded-md px-3 py-2 " +
    "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900";

  return (
    <footer 
      className="bg-slate-900 border-t border-purple-700/40 py-10 px-4 sm:px-6 lg:px-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Legal Section */}
          <nav aria-label="Legal information">
            <h3 className="flex items-center gap-2 text-white font-semibold text-base mb-4">
              <Gavel className="h-5 w-5 text-purple-400" aria-hidden="true" />
              Legal
            </h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  to="/terms"
                  className={linkBaseClasses}
                  aria-label="Read our Terms of Service"
                >
                  <Scale className="h-4 w-4 text-purple-400" aria-hidden="true" />
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className={linkBaseClasses}
                  aria-label="Read our Privacy Policy"
                >
                  <Shield className="h-4 w-4 text-purple-400" aria-hidden="true" />
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </nav>

          {/* Quick Links Section */}
          <nav aria-label="Quick links">
            <h3 className="flex items-center gap-2 text-white font-semibold text-base mb-4">
              <FileText className="h-5 w-5 text-purple-400" aria-hidden="true" />
              Quick Links
            </h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link
                  to="/chat"
                  className={linkBaseClasses}
                  aria-label="Contact us via chat"
                >
                  <Mail className="h-4 w-4 text-purple-400" aria-hidden="true" />
                  Contact
                </Link>
              </li>
              <li>
                <a
                  href="https://www.josephmgfibion.org/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkBaseClasses}
                  aria-label="View XML sitemap (opens in new tab)"
                >
                  <FileText className="h-4 w-4 text-purple-400" aria-hidden="true" />
                  Sitemap
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* Made by Gfibion Genesis */}
          <div className="flex flex-col items-center md:items-end justify-center">
            <span className="text-gray-400 text-xs mb-2">Made by</span>
            <div className="flex items-center gap-2">
              <img 
                src={gfibionGenesisLogo} 
                alt="Gfibion Genesis company logo" 
                className="h-8 w-auto"
                loading="lazy"
              />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-blue-400 font-bold text-base">
                Gfibion Genesis
              </span>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-purple-800/30 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} Gfibion Joseph Mutua. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
