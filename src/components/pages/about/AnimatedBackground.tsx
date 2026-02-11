/**
 * AnimatedBackground - Premium ambient decoration
 * Subtle gradient orbs that add visual depth without distraction
 */
import React from "react";

const AnimatedBackgroundComponent: React.FC = () => {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Primary orb — top center */}
      <div
        className="animate-ambient-pulse-1 absolute"
        style={{
          top: "-5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(400px, 60vw, 800px)",
          height: "clamp(300px, 40vw, 500px)",
          background:
            "radial-gradient(ellipse at center, hsl(var(--glow) / 0.05) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(60px)",
        }}
      />
      {/* Secondary orb — bottom right */}
      <div
        className="animate-ambient-pulse-2 absolute"
        style={{
          bottom: "10%",
          right: "-5%",
          width: "clamp(300px, 40vw, 600px)",
          height: "clamp(250px, 30vw, 400px)",
          background:
            "radial-gradient(ellipse at center, hsl(var(--glow) / 0.04) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(50px)",
        }}
      />
      {/* Inline keyframes for ambient pulse */}
      <style>{`
        @keyframes ambient-pulse-1 {
          0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.05); }
        }
        @keyframes ambient-pulse-2 {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.08); }
        }
        .animate-ambient-pulse-1 {
          animation: ambient-pulse-1 7s ease-in-out infinite;
        }
        .animate-ambient-pulse-2 {
          animation: ambient-pulse-2 9s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-ambient-pulse-1,
          .animate-ambient-pulse-2 {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export const AnimatedBackground = React.memo(AnimatedBackgroundComponent);
