import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Shield, Scale, Calendar, Globe } from "lucide-react";
import { APP_VERSION_WITH_PREFIX } from "@/utils/version";

interface LegalPageLayoutProps {
  title: string;
  subtitle: string;
  lastUpdated: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const LegalPageLayout: React.FC<LegalPageLayoutProps> = ({
  title,
  subtitle,
  lastUpdated,
  children,
  icon = <Scale className="h-8 w-8" />,
}) => {
  return (
    <PageLayout>
      {/* Industrial Background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative overflow-hidden border-b border-white/10 pt-20 pb-16">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative z-10 container mx-auto px-4 text-center sm:px-6 lg:px-8">
            <div className="mb-6 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-3 shadow-lg">
              <div className="text-primary">{icon}</div>
            </div>
            <h1 className="font-display mb-4 text-4xl font-bold tracking-tight text-white uppercase md:text-5xl">
              {title}
            </h1>
            <p className="mx-auto max-w-2xl font-mono text-lg text-slate-400">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Legal Info Bar */}
        <div className="sticky top-0 z-20 border-b border-white/10 bg-black/40 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col items-center justify-center gap-4 font-mono text-xs text-slate-400 sm:flex-row">
              <div className="flex items-center gap-2">
                <Calendar className="text-primary h-4 w-4" />
                <span>LAST_UPDATED: {lastUpdated}</span>
              </div>
              <div className="hidden text-white/10 sm:block">|</div>
              <div className="flex items-center gap-2">
                <Shield className="text-primary h-4 w-4" />
                <span>VERSION: {APP_VERSION_WITH_PREFIX}</span>
              </div>
              <div className="hidden text-white/10 sm:block">|</div>
              <div className="flex items-center gap-2">
                <Globe className="text-primary h-4 w-4" />
                <span>SCOPE: GLOBAL</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Content */}
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="relative overflow-hidden rounded-lg border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-sm sm:p-12">
              <div className="prose prose-invert prose-lg prose-headings:font-display prose-headings:tracking-wide prose-p:text-slate-300 prose-li:text-slate-300 prose-strong:text-white prose-a:text-primary hover:prose-a:text-primary/80 max-w-none">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LegalPageLayout;
