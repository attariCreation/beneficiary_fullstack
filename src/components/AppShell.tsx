"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLogin = pathname.startsWith("/login");

    if (isLogin) return <>{children}</>;

    return (
        <div className="flex min-h-screen w-full">
            <Sidebar />
            <div className="flex-1">
                <TopNav />
                <main className="p-4">{children}</main>
            </div>
        </div>
    );
}


