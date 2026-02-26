"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useTheme } from "@/lib/theme-provider";
import { useEffect, useState } from "react";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  animated?: boolean;
}

const sizeMap = {
  sm: 40,
  md: 60,
  lg: 120,
};

export function BrandLogo({
  size = "md",
  className,
}: BrandLogoProps) {
  const dimension = sizeMap[size];
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = "/logos/logo-01.svg";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden transition-opacity duration-300",
        !mounted && "opacity-0",
        className
      )}
      style={{ width: dimension, height: dimension }}
    >
      <Image
        src={logoSrc}
        alt="Kaze Keza Logo"
        width={dimension}
        height={dimension}
        className={cn(
          "object-contain w-full h-full",
          resolvedTheme === "dark" && "drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] brightness-150 contrast-125"
        )}
        priority
      />
    </div>
  );
}
