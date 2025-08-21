"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type UserRole = "admin" | "receptionist" | "staff";

export interface AuthUser {
    name: string;
    role: UserRole;
    email?: string;
}

interface AuthContextValue {
    user: AuthUser | null;
    isAuthenticated: boolean;
    login: (user: AuthUser) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "beneficiary_auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        try {
            const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
            if (raw) {
                const parsed = JSON.parse(raw) as AuthUser;
                setUser(parsed);
            }
        } catch {
            // ignore parse/storage errors
        } finally {
            setIsHydrated(true);
        }
    }, []);

    const login = useCallback(
        (nextUser: AuthUser) => {
            setUser(nextUser);
            try {
                if (typeof window !== "undefined") {
                    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
                    document.cookie = `beneficiary_auth_user=1; path=/`;
                }
            } catch {
                // ignore storage errors
            }
            router.replace("/dashboard");
        },
        [router]
    );

    const logout = useCallback(() => {
        setUser(null);
        try {
            if (typeof window !== "undefined") {
                window.localStorage.removeItem(STORAGE_KEY);
                document.cookie = `beneficiary_auth_user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
            }
        } catch {
            // ignore storage errors
        }
        router.replace("/login");
    }, [router]);

    const value = useMemo<AuthContextValue>(
        () => ({ user, isAuthenticated: !!user, login, logout }),
        [user, login, logout]
    );

    if (!isHydrated) {
        return null;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}


