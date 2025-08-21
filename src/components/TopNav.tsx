"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function TopNav() {
    const { user, logout } = useAuth();
    return (
        <div className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b bg-background/80 px-4 backdrop-blur">
            <div className="font-semibold tracking-tight">Beneficiary Management</div>
            <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground hidden sm:inline">{user?.name}</span>
                <Button variant="outline" onClick={logout}>
                    Logout
                </Button>
            </div>
        </div>
    );
}


