"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

    useEffect(() => {
        const role = localStorage.getItem("role");
        if (role === "admin") {
            setIsAdmin(true);
        } else {
            router.replace("/");
        }
    }, []);

    if (isAdmin === null) return null; 

    return <>{children}</>; 
}
