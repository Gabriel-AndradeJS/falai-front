'use client';
import axios from "axios";
import React, { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface User {
    id: string;
    name: string;
    email: string;
    token: string;
}

interface AuthContextType {
    signIn: (email: string, password: string) => Promise<User>;
}


const AuthContext = createContext<AuthContextType | null>(null)


function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const signIn = async (email: string, password: string) => {
        try {
            const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + "auth/login", {
                email, password
            })

            if (res.status !== 204) {
                router.push("/login");
            }
            Cookies.set("token", res.data.token);
      Cookies.set("token", res.data.token);
      Cookies.set("id", res.data.id);
      Cookies.set("email", res.data.email);
      Cookies.set("name", res.data.name);
            router.push("/");
            return res.data;
        } catch (error) {
            return { message: "An unexpected error occurred" };
        }
    }

    return (
        <AuthContext.Provider value={{ signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthContext, AuthProvider, useAuth }