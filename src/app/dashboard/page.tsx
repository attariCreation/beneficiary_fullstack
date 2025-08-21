"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function DashboardPage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();

    useEffect(() => {
        if (!isAuthenticated) router.replace("/login");
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    const cards = [
        { title: "Total Beneficiaries", value: "1,234" },
        ...(user?.role === "admin" ? [{ title: "Total Staff", value: "42" }] : []),
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((c, idx) => (
                <motion.div key={c.title} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                    <Card>
                        <CardHeader>
                            <CardTitle>{c.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{c.value}</div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    );
}


