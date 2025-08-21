"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth, type UserRole } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState<UserRole>("admin");

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        login({ name: email.split("@")[0] || "User", role, email });
        router.replace("/dashboard");
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 rounded-lg border bg-card p-6 shadow">
                <div className="text-xl font-semibold">Login</div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <select
                        id="role"
                        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
                        value={role}
                        onChange={(e) => setRole(e.target.value as UserRole)}
                    >
                        <option value="admin">Admin</option>
                        <option value="receptionist">Receptionist</option>
                        <option value="staff">Staff</option>
                    </select>
                </div>
                <Button type="submit" className="w-full">
                    Sign in
                </Button>
            </form>
        </div>
    );
}


