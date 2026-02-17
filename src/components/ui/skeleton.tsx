import React from "react";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  variant?: "default" | "card" | "text" | "avatar" | "chart" | "button";
  width?: string | number;
  height?: string | number;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  animate?: boolean;
}

const variantStyles = {
  default: "bg-muted",
  card: "bg-muted rounded-xl",
  text: "bg-muted rounded",
  avatar: "bg-muted rounded-full",
  chart: "bg-muted rounded-lg",
  button: "bg-muted rounded-md",
};

const roundedStyles = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
};

export const Skeleton: React.FC<SkeletonProps> = ({
  className = "",
  variant = "default",
  width,
  height,
  rounded,
  animate = true,
}) => {
  const baseClasses = cn(
    variantStyles[variant],
    rounded && roundedStyles[rounded],
    animate && "animate-pulse",
    className
  );

  const style: React.CSSProperties = {
    width: width,
    height: height,
  };

  return <div className={baseClasses} style={style} />;
};

export default Skeleton;
