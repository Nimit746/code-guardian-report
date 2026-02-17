import React from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/layout/HeroSection";
import { Shield, Scale, Calendar, Mail, Globe } from "lucide-react";
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
      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          title={title}
          subtitle={subtitle}
          className="py-16 sm:py-20 lg:py-24"
        >
          <div className="mx-auto max-w-4xl">
            {/* Legal Info Card */}
            <div className="border-border bg-card rounded-lg border p-6 sm:p-8">
              <div className="flex flex-col items-center justify-center gap-6 text-center sm:flex-row sm:text-left">
                <div className="bg-primary text-primary-foreground rounded-xl p-4">
                  {icon}
                  <div className="text-lg font-bold">Legal</div>
                </div>

                <div className="flex-1 space-y-3">
                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="text-primary h-5 w-5" />
                      <span className="font-medium">
                        Last Updated: {lastUpdated}
                      </span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Globe className="text-primary h-5 w-5" />
                      <span className="font-medium">Effective Globally</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-center gap-4 sm:flex-row">
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Shield className="text-muted-foreground h-5 w-5" />
                      <span className="font-medium">
                        Code Guardian {APP_VERSION_WITH_PREFIX}
                      </span>
                    </div>
                    <div className="text-muted-foreground flex items-center gap-2">
                      <Mail className="text-muted-foreground h-5 w-5" />
                      <span className="font-medium">
                        Contact: itisaddy7@gmail.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HeroSection>

        {/* Legal Content */}
        <div className="container mx-auto px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8 lg:pb-24">
          <div className="mx-auto max-w-4xl">
            <div className="border-border bg-card rounded-lg border p-8 sm:p-12">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
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
