"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  Shield,
  Home,
  Menu,
  X,
  Info,
  Lock,
  Award,
  User,
  LogOut,
  History,
  Github,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/lib/auth-context";
import { useNavigation } from "@/lib/navigation-context";
import { AuthModal } from "@/components/auth/AuthModal";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import { PWAQuickActions } from "@/components/pwa/PWAQuickActions";
import { ThemeToggle } from "@/components/common/ThemeToggle";

interface NavigationProps {
  className?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  className: _className,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const { user, userProfile, logout } = useAuth();
  const { currentSection, navigateTo } = useNavigation();

  const getGithubAvatarUrl = () => {
    const githubProvider = user?.providerData?.find(
      (p) => p.providerId === "github.com"
    );
    const githubUserId = githubProvider?.uid;

    return (
      userProfile?.githubMetadata?.avatarUrl ||
      githubProvider?.photoURL ||
      user?.photoURL ||
      (githubUserId
        ? `https://avatars.githubusercontent.com/u/${githubUserId}`
        : null)
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    navigateTo(sectionId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const navItems = [
    { id: "home", label: "Home", icon: <Home className="h-4 w-4" /> },
    { id: "about", label: "About", icon: <Info className="h-4 w-4" /> },
    ...(user
      ? [
          {
            id: "history",
            label: "History",
            icon: <History className="h-4 w-4" />,
          },
        ]
      : []),
    {
      id: "github-analysis",
      label: "GitHub",
      icon: <Github className="h-4 w-4" />,
      badge: "Pro",
    },
    { id: "privacy", label: "Privacy", icon: <Lock className="h-4 w-4" /> },
    { id: "terms", label: "Terms", icon: <Award className="h-4 w-4" /> },
  ];

  const isActive = (sectionId: string) => currentSection === sectionId;

  if (!mounted) return null;

  const navContent = (
    <nav
      className={cn(
        "transition-all duration-300",
        isScrolled
          ? "border-border/40 bg-background/75 supports-[backdrop-filter]:bg-background/60 border-b shadow-[0_1px_0_0_hsl(var(--glow)/0.08)] backdrop-blur-xl"
          : "bg-background/0 border-b border-transparent"
      )}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        width: "100%",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between sm:h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <Shield className="text-primary h-5 w-5" />
            <span className="font-display text-lg">Code Guardian</span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive(item.id)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tablet Nav */}
          <div className="hidden flex-1 items-center justify-center gap-1 md:flex lg:hidden">
            {navItems.slice(0, 3).map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigate(item.id)}
                className={cn(
                  "flex items-center gap-1 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                  isActive(item.id)
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Auth — Desktop */}
            {user ? (
              <div className="relative hidden md:block" ref={userDropdownRef}>
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="hover:bg-muted flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors"
                >
                  {getGithubAvatarUrl() ? (
                    <img
                      src={getGithubAvatarUrl() as string}
                      alt="Profile"
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : null}
                  <span className="hidden max-w-[100px] truncate text-sm font-medium lg:block">
                    {userProfile?.displayName ||
                      userProfile?.githubUsername ||
                      user?.email?.split("@")[0] ||
                      "User"}
                  </span>
                  <ChevronDown
                    className={cn(
                      "text-muted-foreground hidden h-3.5 w-3.5 transition-transform duration-150 lg:block",
                      showUserDropdown && "rotate-180"
                    )}
                  />
                </button>

                {/* Dropdown */}
                {showUserDropdown && (
                  <div className="border-border bg-card absolute right-0 z-50 mt-1 w-52 rounded-md border py-1 shadow-lg">
                    <div className="border-border border-b px-3 py-2.5">
                      <p className="truncate text-sm font-medium">
                        {userProfile?.displayName ||
                          userProfile?.githubUsername ||
                          "User"}
                      </p>
                      <p className="text-muted-foreground truncate text-xs">
                        {user?.email}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        handleNavigate("history");
                        setShowUserDropdown(false);
                      }}
                      className="text-foreground hover:bg-muted flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors"
                    >
                      <History className="h-4 w-4" />
                      Scan History
                    </button>
                    <div className="border-border border-t">
                      <button
                        onClick={() => {
                          logout();
                          setShowUserDropdown(false);
                        }}
                        className="text-destructive hover:bg-destructive/10 flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="text-muted-foreground hover:text-foreground rounded-md px-3 py-1.5 text-sm font-medium"
                >
                  Sign In
                </Button>
                <Button
                  size="sm"
                  onClick={() => setShowAuthModal(true)}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-1.5 text-sm font-medium"
                >
                  Get Started
                </Button>
              </div>
            )}

            <ThemeToggle />

            <NotificationCenter className="text-muted-foreground hover:bg-muted hover:text-foreground h-8 w-8 rounded-md transition-colors sm:h-9 sm:w-9" />

            <PWAQuickActions className="text-muted-foreground hover:bg-muted hover:text-foreground hidden h-8 w-8 rounded-md transition-colors sm:flex sm:h-9 sm:w-9" />

            {/* Mobile Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-muted-foreground hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md p-0 sm:h-9 sm:w-9 lg:hidden"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "bg-background/90 fixed inset-x-0 backdrop-blur-xl transition-all duration-300 md:hidden",
            isMobileMenuOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-2 opacity-0"
          )}
          style={{
            top: "0",
            paddingTop: "calc(56px + env(safe-area-inset-top))",
            height: "100vh",
            zIndex: 40,
          }}
        >
          <div className="border-border h-full overflow-y-auto border-t px-4 py-4">
            {/* Nav Items */}
            <div className="space-y-0.5">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive(item.id)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-[10px] font-semibold uppercase">
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile Auth */}
            <div className="border-border mt-6 border-t pt-4">
              {user ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-3 rounded-md px-3 py-2.5">
                    {getGithubAvatarUrl() ? (
                      <img
                        src={getGithubAvatarUrl() as string}
                        alt="Profile"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : null}
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {userProfile?.displayName ||
                          userProfile?.githubUsername ||
                          "User"}
                      </p>
                      <p className="text-muted-foreground truncate text-xs">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-destructive hover:bg-destructive/10 flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-muted-foreground hover:bg-muted hover:text-foreground flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-primary text-primary-foreground flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-opacity hover:opacity-90"
                  >
                    <Shield className="h-4 w-4" />
                    Get Started
                  </button>
                </div>
              )}
            </div>

            {/* Mobile footer */}
            <div className="border-border mt-6 border-t pt-4 text-center">
              <p className="text-muted-foreground text-xs">
                © {new Date().getFullYear()} Code Guardian
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );

  return (
    <>
      {createPortal(navContent, document.body)}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};
