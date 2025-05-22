'use client';
import axios from "axios";
import React, { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
    token: string;
}

interface AuthContextType {
    signIn: (email: string, password: string) => Promise<User>;
    logout: () => void;
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
      Cookies.set("avatar", res.data.avatar);
            router.push("/");
            return res.data;
        } catch (error) {
            return { message: "An unexpected error occurred" };
        }
    }

    const logout = () => {
        Cookies.remove("token");
        Cookies.remove("id");
        Cookies.remove("email");
        Cookies.remove("name");
        Cookies.remove("avatar");
        router.push("/login");
    }

    return (
        <AuthContext.Provider value={{ signIn, logout }}>
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