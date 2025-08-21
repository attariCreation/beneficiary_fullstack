"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Beneficiary = {
    id: string;
    name: string;
    cnic: string;
    phone: string;
    address: string;
    status: string;
};

export default function BeneficiariesPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const [items, setItems] = useState<Beneficiary[]>([]);
    const [editing, setEditing] = useState<Beneficiary | null>(null);

    useEffect(() => {
        if (!isAuthenticated) router.replace("/login");
    }, [isAuthenticated, router]);

    useEffect(() => {
        setItems([
            { id: "1", name: "Ali Raza", cnic: "12345-6789012-3", phone: "0300-1234567", address: "Lahore", status: "Active" },
            { id: "2", name: "Sara Khan", cnic: "98765-4321098-7", phone: "0301-7654321", address: "Karachi", status: "Pending" },
        ]);
    }, []);

    const upsert = (b: Omit<Beneficiary, "id">, id?: string) => {
        if (id) {
            setItems((prev) => prev.map((it) => (it.id === id ? { ...it, ...b, id } : it)));
        } else {
            setItems((prev) => [{ id: Math.random().toString(36).slice(2), ...b }, ...prev]);
        }
    };

    const remove = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id));

    if (!isAuthenticated) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Beneficiaries</h1>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>Add Beneficiary</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add Beneficiary</DialogTitle>
                        </DialogHeader>
                        <BeneficiaryForm onSubmit={(data) => upsert(data)} />
                    </DialogContent>
                </Dialog>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>CNIC</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[160px]">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((b) => (
                        <TableRow key={b.id}>
                            <TableCell>{b.name}</TableCell>
                            <TableCell>{b.cnic}</TableCell>
                            <TableCell>{b.phone}</TableCell>
                            <TableCell>{b.address}</TableCell>
                            <TableCell>{b.status}</TableCell>
                            <TableCell>
                                <div className="flex gap-2">
                                    <Dialog onOpenChange={(open) => !open && setEditing(null)}>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" onClick={() => setEditing(b)}>Edit</Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Beneficiary</DialogTitle>
                                            </DialogHeader>
                                            <BeneficiaryForm
                                                initial={b}
                                                onSubmit={(data) => upsert(data, b.id)}
                                            />
                                        </DialogContent>
                                    </Dialog>
                                    <Button variant="destructive" onClick={() => remove(b.id)}>Delete</Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

function BeneficiaryForm({ initial, onSubmit }: { initial?: Partial<Beneficiary>; onSubmit: (b: Omit<Beneficiary, "id">) => void }) {
    const [name, setName] = useState(initial?.name ?? "");
    const [cnic, setCnic] = useState(initial?.cnic ?? "");
    const [phone, setPhone] = useState(initial?.phone ?? "");
    const [address, setAddress] = useState(initial?.address ?? "");
    const [status, setStatus] = useState(initial?.status ?? "Active");

    return (
        <form
            className="grid gap-3"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit({ name, cnic, phone, address, status });
            }}
        >
            <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="cnic">CNIC</Label>
                <Input id="cnic" value={cnic} onChange={(e) => setCnic(e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <select id="status" className="h-10 rounded-md border border-input bg-background px-3 text-sm" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Inactive</option>
                </select>
            </div>
            <Button type="submit">Save</Button>
        </form>
    );
}


