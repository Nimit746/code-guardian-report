import { type VariantProps, cva } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center rounded-none border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 font-mono uppercase tracking-wider",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// Button variants
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-sm font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden uppercase tracking-wider font-mono",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none",
        destructive:
          "bg-destructive text-destructive-foreground border-2 border-destructive hover:bg-destructive/90 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-accent hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        modern:
          "bg-card border-2 border-border text-card-foreground hover:border-primary hover:shadow-[4px_4px_0px_0px_hsl(var(--primary))]",
        glass:
          "backdrop-blur-none bg-background/50 border-2 border-border text-foreground hover:bg-background/80 hover:border-primary",
        gradient:
          "bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/90 relative overflow-hidden after:absolute after:inset-0 after:bg-white/10 after:opacity-0 after:hover:opacity-100 after:transition-opacity",
        success:
          "bg-green-600 text-white border-2 border-green-600 hover:bg-green-700 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        warning:
          "bg-yellow-600 text-white border-2 border-yellow-600 hover:bg-yellow-700 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
        ultra:
          "bg-primary text-primary-foreground border-2 border-primary text-lg font-black tracking-widest hover:bg-primary/90 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        xl: "h-16 px-10 text-lg",
        ultra: "h-20 px-12 text-xl",
        icon: "h-11 w-11",
        "icon-sm": "h-9 w-9",
        "icon-lg": "h-14 w-14",
        "icon-xl": "h-16 w-16",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Toggle variants
export const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-none text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground font-mono uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type BadgeProps = VariantProps<typeof badgeVariants>;
export type ButtonProps = VariantProps<typeof buttonVariants>;
export type ToggleProps = VariantProps<typeof toggleVariants>;
