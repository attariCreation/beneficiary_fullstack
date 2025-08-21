"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Staff = { id: string; name: string; email: string; role: "admin" | "receptionist" | "staff" };

export default function StaffPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const [items, setItems] = useState<Staff[]>([]);

    useEffect(() => {
        if (!isAuthenticated) router.replace("/login");
    }, [isAuthenticated, router]);

    useEffect(() => {
        setItems([
            { id: "1", name: "Admin One", email: "admin@site.com", role: "admin" },
            { id: "2", name: "Reception One", email: "reception@site.com", role: "receptionist" },
        ]);
    }, []);

    const add = (s: Omit<Staff, "id">) => setItems((prev) => [{ id: Math.random().toString(36).slice(2), ...s }, ...prev]);
    const remove = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id));

    if (!isAuthenticated) return null;
    if (user?.role !== "admin") {
        return <div className="text-sm text-muted-foreground">You do not have access to this page.</div>;
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Staff</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Add Staff</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Staff</DialogTitle>
                        </DialogHeader>
                        <StaffForm onSubmit={add} />
                    </DialogContent>
                </Dialog>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="w-[120px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((s) => (
                        <TableRow key={s.id}>
                            <TableCell>{s.name}</TableCell>
                            <TableCell>{s.email}</TableCell>
                            <TableCell className="capitalize">{s.role}</TableCell>
                            <TableCell>
                                <Button variant="destructive" onClick={() => remove(s.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function StaffForm({ onSubmit }: { onSubmit: (s: Omit<Staff, "id">) => void }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState<"admin" | "receptionist" | "staff">("staff");
    return (
        <form
            className="grid gap-3"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ name, email, role });
            }}
        >
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="role">Role</Label>
                <select id="role" className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={role} onChange={(e) => setRole(e.target.value as any)}>
                    <option value="admin">Admin</option>
                    <option value="receptionist">Receptionist</option>
                    <option value="staff">Staff</option>
                </select>
            </div>
            <Button type="submit">Save</Button>
        </form>
    );
}


