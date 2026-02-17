/**
 * AnimatedBackground - Industrial Grid Overlay
 * Technical grid pattern with scanning lines
 */
import React from "react";

const AnimatedBackgroundComponent: React.FC = () => {
  return (
    <div
      className="bg-background pointer-events-none absolute inset-0 overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Base Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Radial Vignette */}
      <div className="bg-background/90 absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Scanning Line */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-20">
        <div className="h-[500%] w-[500%] animate-[scan_60s_linear_infinite] bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,#000_1px,#000_2px)] opacity-[0.03] dark:bg-[repeating-linear-gradient(0deg,transparent,transparent_1px,#fff_1px,#fff_2px)]" />
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(-50%) rotate(0deg); }
          100% { transform: translateY(0%) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export const AnimatedBackground = React.memo(AnimatedBackgroundComponent);
