"use client";

import { CONTACT_INFO } from "@/lib/constants/contact";
import { downloadVCard } from "@/lib/vcard";
import { VirtualCardButton } from "@/components/contact/virtual-card-button";
import { motion } from "framer-motion";
import { UserPlus, Mail, MessageCircle, Twitter, Linkedin, Github } from "lucide-react";
import Image from "next/image";

export default function VirtualBusinessCard() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    };

    return (
        <main className="min-h-[100dvh] w-full flex flex-col items-center py-12 px-6 sm:px-8 bg-noise">
            <div className="w-full max-w-md mx-auto z-10">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center text-center space-y-4 mb-10"
                >
                    <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-accent-honey shadow-[0_0_15px_rgba(235,169,55,0.3)] mb-2">
                        <Image
                            src="/kaze-avatar.jpg"
                            alt={CONTACT_INFO.name}
                            fill
                            className="object-cover"
                            sizes="112px"
                            priority
                            onError={(e) => {
                                // Fallback to a gradient if no image is present yet
                                const target = e.target as HTMLImageElement;
                                target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='112' height='112' viewBox='0 0 112 112'%3E%3Crect width='112' height='112' fill='%231f2937'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='40' font-weight='bold' fill='%23eba937' dominant-baseline='middle' text-anchor='middle'%3EJK%3C/text%3E%3C/svg%3E";
                            }}
                        />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark">
                            {CONTACT_INFO.name}
                        </h1>
                        <p className="text-accent-honey font-medium mt-1">
                            {CONTACT_INFO.title}
                        </p>
                    </div>
                </motion.div>

                {/* Links Section */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="space-y-4"
                >
                    <motion.div variants={item}>
                        <VirtualCardButton
                            icon={<UserPlus size={24} />}
                            title="Save to Contacts"
                            subtitle="Download vCard"
                            onClick={downloadVCard}
                            isPrimary
                        />
                    </motion.div>

                    <motion.div variants={item} className="pt-2">
                        <VirtualCardButton
                            icon={<MessageCircle size={22} />}
                            title="WhatsApp"
                            subtitle="Message directly"
                            href={CONTACT_INFO.whatsapp.url}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <VirtualCardButton
                            icon={<Mail size={22} />}
                            title="Email"
                            subtitle={CONTACT_INFO.email}
                            href={`mailto:${CONTACT_INFO.email}`}
                        />
                    </motion.div>

                    <div className="py-4 flex items-center justify-center">
                        <div className="h-px w-16 bg-border-light dark:bg-border-dark opacity-50" />
                        <span className="px-4 text-xs font-semibold uppercase tracking-wider text-secondary-light/60 dark:text-secondary-dark/60">
                            Connect
                        </span>
                        <div className="h-px w-16 bg-border-light dark:bg-border-dark opacity-50" />
                    </div>

                    <motion.div variants={item}>
                        <VirtualCardButton
                            icon={<Linkedin size={22} />}
                            title="LinkedIn"
                            href={CONTACT_INFO.socials.linkedin}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <VirtualCardButton
                            icon={<Twitter size={22} />}
                            title="X (Twitter)"
                            href={CONTACT_INFO.socials.x}
                        />
                    </motion.div>

                    <motion.div variants={item}>
                        <VirtualCardButton
                            icon={<Github size={22} />}
                            title="GitHub"
                            href={CONTACT_INFO.socials.github}
                        />
                    </motion.div>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1 }}
                    className="mt-16 text-center text-sm text-secondary-light/70 dark:text-secondary-dark/70"
                >
                    <p>© {new Date().getFullYear()} {CONTACT_INFO.name}</p>
                </motion.div>
            </div>
        </main>
    );
}
