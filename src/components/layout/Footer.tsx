"use client";

import * as React from "react";
import { Shield, Mail, Github, ExternalLink } from "lucide-react";
import { APP_VERSION_WITH_PREFIX } from "@/utils/version";

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const platformLinks = [
    { label: "Upload Code", id: "upload" },
    { label: "AI Analysis", id: "ai-config" },
    { label: "Results", id: "results" },
  ];

  const companyLinks = [
    { label: "About", href: "/about" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ];

  return (
    <footer
      className={`border-t border-border bg-background ${className}`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2.5">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-display text-lg">Code Guardian</span>
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Enterprise-grade static code analysis powered by AI.
              Comprehensive security assessments for modern development teams.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/ARedRocket/code-guardian-report"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="mailto:contact@codeguardian.dev"
                className="rounded-md border border-border p-2 text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Platform</h4>
            <ul className="space-y-2.5">
              {platformLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Company</h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    {link.href.startsWith("http") && (
                      <ExternalLink className="h-3 w-3" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Code Guardian. All rights reserved.
          </p>
          {APP_VERSION_WITH_PREFIX && (
            <span className="text-xs text-muted-foreground">
              {APP_VERSION_WITH_PREFIX}
            </span>
          )}
        </div>
      </div>
    </footer>
  );
};

export { Footer };
export default Footer;
