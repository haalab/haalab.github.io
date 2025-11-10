import { Github, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Lab Info */}
          <div>
            <h3 className="font-bold text-lg mb-3 font-['Outfit']">Human-Agent Ally Lab</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Preparing for the human-agent society through innovative research in
              human-agent teaming and societal transformation.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-3 font-['Outfit']">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/research" className="text-muted-foreground hover:text-primary transition-colors">
                  Research Areas
                </a>
              </li>
              <li>
                <a href="/people" className="text-muted-foreground hover:text-primary transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="/publications" className="text-muted-foreground hover:text-primary transition-colors">
                  Publications
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="font-bold text-lg mb-3 font-['Outfit']">Connect With Us</h3>
            <div className="flex gap-4 mb-4">
              <a
                href="https://github.com/haalab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-white transition-all flex items-center justify-center"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/haalab"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-white transition-all flex items-center justify-center"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="mailto:contact@haalab.org"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-white transition-all flex items-center justify-center"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Email: contact@haalab.org
            </p>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Human-Agent Ally Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
