"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const navItems = [
    { href: "/dashboard", label: "Dashboard", roles: ["admin", "receptionist", "staff"] },
    { href: "/beneficiaries", label: "Beneficiaries", roles: ["admin", "receptionist", "staff"] },
    { href: "/staff", label: "Staff", roles: ["admin"] },
] as const;

export default function Sidebar() {
    const pathname = usePathname();
    const { user } = useAuth();
    const [open, setOpen] = useState(true);
    const asideRef = useRef<HTMLDivElement | null>(null);
    const linksRef = useRef<HTMLDivElement | null>(null);

    const available = navItems.filter((n) => (user ? n.roles.includes(user.role) : false));

    useEffect(() => {
        if (!asideRef.current) return;
        const ctx = gsap.context(() => {
            gsap.fromTo(
                asideRef.current,
                { x: -24, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
            );
            if (linksRef.current) {
                gsap.fromTo(
                    linksRef.current.querySelectorAll("a"),
                    { x: -8, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: "power2.out", delay: 0.1 }
                );
            }
        }, asideRef);
        return () => ctx.revert();
    }, [pathname, available.length]);

    return (
        <div className="relative h-screen sticky top-0">
            <button
                className="md:hidden absolute -right-3 top-3 z-20 rounded-full border bg-background px-2 py-1 text-xs shadow"
                onClick={() => setOpen((v) => !v)}
            >
                {open ? "Hide" : "Menu"}
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.aside
                        key="sidebar"
                        initial={{ x: -16, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -16, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-y-0 left-0 z-10 w-64 border-r bg-sidebar/95 backdrop-blur p-4 md:static md:h-screen"
                        ref={asideRef as any}
                    >
                        <div className="mb-6 text-lg font-semibold">Navigation</div>
                        <nav ref={linksRef as any} className="grid gap-2">
                            {available.map((item) => {
                                const active = pathname.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "rounded-md px-3 py-2 text-sm transition-colors",
                                            active
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "hover:bg-accent hover:shadow-sm"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </motion.aside>
                )}
            </AnimatePresence>
        </div>
    );
}


