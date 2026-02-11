import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Upload,
  Play,
  FileText,
  Download,
  Wand2,
  Shield,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Code,
  Eye,
  Lightbulb,
} from "lucide-react";

const HowToUseSection = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      id: 1,
      title: "Upload Your Code",
      icon: <Upload className="h-6 w-6" />,
      description: "Start by uploading your code files or entire project",
      details: [
        "Drag & drop files directly into the upload area",
        "Support for individual files or entire project folders",
        "Accepts all major programming languages",
        "Maximum file size: 100MB per upload",
        "Batch upload multiple files at once",
      ],
      supportedFormats: [
        "JavaScript",
        "Python",
        "Java",
        "C#",
        "PHP",
        "Go",
        "Rust",
        "TypeScript",
        "HTML",
        "CSS",
      ],
      tips: [
        "Include configuration files for better analysis",
        "Upload package.json, requirements.txt for dependency analysis",
        "Larger projects provide more comprehensive insights",
      ],
    },
    {
      id: 2,
      title: "Automated Analysis",
      icon: <Play className="h-6 w-6" />,
      description: "Our AI engine automatically scans your code for issues",
      details: [
        "Real-time security vulnerability detection",
        "Code quality and maintainability analysis",
        "Performance bottleneck identification",
        "Dependency vulnerability scanning",
        "OWASP Top 10 security checks",
      ],
      analysisTypes: [
        {
          name: "Security Scan",
          time: "30-60s",
          icon: <Shield className="h-4 w-4" />,
        },
        {
          name: "Quality Check",
          time: "15-30s",
          icon: <Code className="h-4 w-4" />,
        },
        {
          name: "Performance Review",
          time: "20-45s",
          icon: <AlertTriangle className="h-4 w-4" />,
        },
      ],
      tips: [
        "Analysis time depends on codebase size",
        "Larger files may take longer to process",
        "You can continue browsing while analysis runs",
      ],
    },
    {
      id: 3,
      title: "Review Results",
      icon: <Eye className="h-6 w-6" />,
      description:
        "Examine detailed findings with severity ratings and explanations",
      details: [
        "Interactive dashboard with visual metrics",
        "Severity-based issue categorization",
        "Line-by-line code highlighting",
        "Detailed explanations for each issue",
        "Fix suggestions and recommendations",
      ],
      severityLevels: [
        {
          level: "Critical",
          color: "bg-red-500",
          description: "Immediate security risks",
        },
        {
          level: "High",
          color: "bg-orange-500",
          description: "Important issues to address",
        },
        {
          level: "Medium",
          color: "bg-yellow-500",
          description: "Moderate concerns",
        },
        {
          level: "Low",
          color: "bg-muted0",
          description: "Minor improvements",
        },
      ],
      tips: [
        "Start with Critical and High severity issues",
        "Use filters to focus on specific issue types",
        "Click on issues for detailed explanations",
      ],
    },
    {
      id: 4,
      title: "Generate AI Prompts",
      icon: <Wand2 className="h-6 w-6" />,
      description: "Get custom AI prompts for your specific code issues",
      details: [
        "Tailored prompts based on your analysis results",
        "Ready-to-use with Cursor, Windsurf, or Copilot",
        "Multiple prompt templates for different needs",
        "Context-aware suggestions for your codebase",
        "Copy-paste ready for immediate use",
      ],
      promptTypes: [
        "Security Vulnerability Scanner",
        "Code Quality Fixer",
        "Performance Optimizer",
        "Bug Hunter",
        "API Security Checker",
        "Dependency Checker",
      ],
      tips: [
        "Use Security Scanner for immediate threats",
        "Combine multiple prompts for comprehensive fixes",
        "Prompts include your specific issue details",
      ],
    },
    {
      id: 5,
      title: "Export & Share",
      icon: <Download className="h-6 w-6" />,
      description: "Download reports and share findings with your team",
      details: [
        "Professional PDF reports with executive summary",
        "Detailed CSV exports for data analysis",
        "JSON format for integration with other tools",
        "Shareable links for team collaboration",
        "Custom report templates available",
      ],
      exportFormats: [
        { format: "PDF", description: "Professional reports for stakeholders" },
        { format: "CSV", description: "Data analysis and tracking" },
        { format: "JSON", description: "Integration with CI/CD pipelines" },
        { format: "HTML", description: "Interactive web reports" },
      ],
      tips: [
        "PDF reports are great for management presentations",
        "Use CSV for tracking progress over time",
        "JSON exports work well with automation tools",
      ],
    },
  ];

  const quickStartGuide = [
    "Visit the homepage and click 'Upload Code'",
    "Drag your code files into the upload area",
    "Wait for automatic analysis to complete",
    "Review results in the interactive dashboard",
    "Generate AI prompts for specific fixes",
    "Export reports for documentation",
  ];

  return (
    <section className="bg-white py-16 lg:py-24 dark:bg-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900 sm:text-4xl lg:text-5xl dark:text-white">
            How to Use This Platform
          </h2>
          <p className="dark:text-muted-foreground mx-auto mb-8 max-w-3xl text-lg text-slate-600">
            Follow these simple steps to analyze your code and get actionable
            security insights
          </p>

          {/* Quick Start */}
          <Card className="mx-auto mb-12 max-w-2xl border-blue-100 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-950/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                <CheckCircle className="h-5 w-5" />
                Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-left">
                {quickStartGuide.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <Badge className="flex h-6 min-w-6 items-center justify-center rounded-full bg-blue-600 p-0 text-xs text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
                      {index + 1}
                    </Badge>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </div>

        {/* Step Navigation */}
        <div className="mb-12 flex flex-wrap justify-center gap-2">
          {steps.map((step, index) => (
            <Button
              key={step.id}
              variant={activeStep === index ? "default" : "outline"}
              onClick={() => setActiveStep(index)}
              className={`flex items-center gap-2 ${
                activeStep === index
                  ? "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              }`}
            >
              {step.icon}
              <span className="hidden sm:inline">Step {step.id}</span>
              <span className="sm:hidden">{step.id}</span>
            </Button>
          ))}
        </div>

        {/* Active Step Details */}
        <div className="mx-auto max-w-4xl">
          <Card className="mb-8 border-slate-200 shadow-sm dark:border-slate-700">
            <CardHeader>
              <div className="mb-4 flex items-center gap-4">
                <div className="rounded-lg bg-teal-100 p-3 text-teal-700 dark:bg-teal-900 dark:text-teal-300">
                  {steps[activeStep].icon}
                </div>
                <div>
                  <CardTitle className="text-2xl text-slate-900 dark:text-white">
                    Step {steps[activeStep].id}: {steps[activeStep].title}
                  </CardTitle>
                  <CardDescription className="text-lg text-slate-600 dark:text-slate-400">
                    {steps[activeStep].description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main Details */}
              <div>
                <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
                  What happens in this step:
                </h4>
                <ul className="space-y-2">
                  {steps[activeStep].details.map((detail, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-slate-700 dark:text-slate-300"
                    >
                      <ChevronRight className="text-primary mt-0.5 h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step-specific content */}
              {steps[activeStep].supportedFormats && (
                <div>
                  <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
                    Supported File Types:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {steps[activeStep].supportedFormats.map((format) => (
                      <Badge
                        key={format}
                        variant="outline"
                        className="border-slate-200 text-slate-700 dark:border-slate-700 dark:text-slate-300"
                      >
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {steps[activeStep].analysisTypes && (
                <div>
                  <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
                    Analysis Types:
                  </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {steps[activeStep].analysisTypes.map((type) => (
                      <Card
                        key={type.name}
                        className="border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <div className="text-slate-900 dark:text-white">
                            {type.icon}
                          </div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            {type.name}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Typical time: {type.time}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {steps[activeStep].severityLevels && (
                <div>
                  <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
                    Severity Levels:
                  </h4>
                  <div className="space-y-2">
                    {steps[activeStep].severityLevels.map((severity) => (
                      <div
                        key={severity.level}
                        className="flex items-center gap-3"
                      >
                        <div
                          className={`h-3 w-3 rounded-full ${severity.color}`}
                        ></div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {severity.level}
                        </span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          - {severity.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {steps[activeStep].promptTypes && (
                <div>
                  <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
                    Available Prompt Types:
                  </h4>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {steps[activeStep].promptTypes.map((type) => (
                      <div
                        key={type}
                        className="flex items-center gap-2 rounded bg-slate-100 p-2 dark:bg-slate-800"
                      >
                        <Wand2 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">
                          {type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {steps[activeStep].exportFormats && (
                <div>
                  <h4 className="mb-3 font-semibold text-slate-900 dark:text-white">
                    Export Formats:
                  </h4>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {steps[activeStep].exportFormats.map((format) => (
                      <Card
                        key={format.format}
                        className="border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-slate-900 dark:text-white" />
                          <span className="text-sm font-medium text-slate-900 dark:text-white">
                            {format.format}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {format.description}
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-900 dark:bg-amber-950/30">
                <h4 className="mb-2 flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-200">
                  <Lightbulb className="h-4 w-4" />
                  Pro Tips:
                </h4>
                <ul className="space-y-1">
                  {steps[activeStep].tips.map((tip, index) => (
                    <li
                      key={index}
                      className="text-sm text-amber-700 dark:text-amber-300"
                    >
                      • {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
            >
              Previous Step
            </Button>
            <Button
              onClick={() =>
                setActiveStep(Math.min(steps.length - 1, activeStep + 1))
              }
              disabled={activeStep === steps.length - 1}
              className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
            >
              Next Step
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;
