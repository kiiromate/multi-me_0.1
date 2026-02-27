"use client";

import { motion } from "framer-motion";
import { MoveUpRight } from "lucide-react";
import React from "react";

interface VirtualCardButtonProps {
    href?: string;
    icon: React.ReactNode;
    title: string;
    subtitle?: string;
    onClick?: () => void;
    isPrimary?: boolean;
}

export function VirtualCardButton({
    href,
    icon,
    title,
    subtitle,
    onClick,
    isPrimary = false,
}: VirtualCardButtonProps) {
    const content = (
        <motion.div
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className={`relative flex items-center p-4 rounded-xl border transition-all duration-300 ${isPrimary
                    ? "border-accent-honey/30 bg-accent-honey/10 hover:border-accent-honey/60 hover:bg-accent-honey/20"
                    : "border-border-light/20 bg-background-light/5 hover:border-border-light/40 dark:border-border-dark/50 dark:bg-background-dark/30 dark:hover:border-border-dark/80"
                } glass-card overflow-hidden group`}
        >
            <div
                className={`flex items-center justify-center w-12 h-12 rounded-full ${isPrimary ? "bg-accent-honey text-background-light" : "bg-secondary-light/10 dark:bg-secondary-dark/20 text-text-light dark:text-text-dark"
                    } mr-4`}
            >
                {icon}
            </div>

            <div className="flex-1">
                <h3 className="font-semibold text-lg leading-tight text-text-light dark:text-text-dark">
                    {title}
                </h3>
                {subtitle && (
                    <p className="text-sm text-secondary-light dark:text-secondary-dark mt-0.5">
                        {subtitle}
                    </p>
                )}
            </div>

            <div className="ml-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <MoveUpRight size={20} />
            </div>

            {isPrimary && (
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-accent-honey/20 pointer-events-none" />
            )}
        </motion.div>
    );

    if (href) {
        return (
            <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="block"
            >
                {content}
            </a>
        );
    }

    return (
        <button onClick={onClick} className="w-full text-left">
            {content}
        </button>
    );
}
