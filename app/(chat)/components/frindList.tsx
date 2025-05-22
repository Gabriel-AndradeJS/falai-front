'use client'
import Image from "next/image";
import React, { useState, useEffect } from "react";
import logov2 from "@/public/logo-v2.png";
import { useAuth } from "@/context/authContext";
import { LogOut, UserRound } from "lucide-react";
import Cookies from "js-cookie";
import axios from "axios";
import { set } from "zod/v4";

export type Friend = {
    id: number;
    name: string;
};

interface FriendListProps {
    id: string,
    name: string,
    email: string,
    status: string,
    avatar: string,
}

const mockFriends: Friend[] = [
    { id: 1, name: "Gabriel Andrade" },
    { id: 2, name: "Maria Silva" },
    { id: 3, name: "João Souza" },
    { id: 4, name: "Ana Paula" },
    { id: 5, name: "Carlos Eduardo" },
    { id: 6, name: "Fernanda Lima" },
    { id: 7, name: "Lucas Martins" },
    { id: 8, name: "Patrícia Gomes" },
    { id: 9, name: "Ricardo Alves" },
    { id: 10, name: "Juliana Costa" },
];

export function FriendList({ onSelect }: { onSelect: (friend: Friend) => void }) {
    const { logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState("");
    const [avatar, setAvatar] = useState<string | null>(null);
    const [friends, setFriends] = useState<FriendListProps[] | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredFriends = (friends ?? []).filter(friend =>
        friend.name.toLowerCase().includes(searchTerm)
    );

    useEffect(() => {

        async function handleUsers() {
            const token = Cookies.get("token");
            const users = await axios.get(process.env.NEXT_PUBLIC_API_URL + "user", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            setFriends(users.data);

        }
        handleUsers();
        const avatar = Cookies.get("avatar");
        if (avatar) {
            setAvatar(avatar);
        }
    }, []);



    return (
        <div className="w-full md:w-[25vw] min-w-[240px] border-r border-gray-300 p-4 flex flex-col h-screen">
            <div className="flex flex-col items-center mb-4">
                <Image src={logov2} alt="logo" width={120} />
                <h2 className="text-xl font-semibold text-center mb-4">Conversas</h2>
            </div>

            <input
                onChange={handleChange}
                type="search"
                placeholder="Buscar..."
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
            />

            <div className="space-y-2 flex-1 overflow-auto">
                {filteredFriends.length > 0 ? (
                    filteredFriends.map((friend) => (
                        <div
                            key={friend.id}
                            onClick={() => onSelect({ id: Number(friend.id), name: friend.name })}
                            className="flex items-center space-x-3 p-2 rounded-md hover:bg-blue-400 cursor-pointer"
                        >
                            {friend.avatar ? (
                                <div className="w-10 h-10 rounded-full overflow-hidden">
                                    <Image
                                        src={`http://localhost:4000/files/${avatar}`}
                                        alt="avatar"
                                        width={40}
                                        height={40}
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <UserRound />
                            )}
                            <p>{friend.name}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm text-center">Nenhum amigo encontrado.</p>
                )}
            </div>

            <footer className="mt-4 border-t border-gray-300 pt-2 flex items-center justify-between">
                {avatar ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <Image
                            src={`http://localhost:4000/files/${avatar}`}
                            alt="avatar"
                            width={40}
                            height={40}
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <UserRound />
                )}
                <button className="cursor-pointer" onClick={logout}>
                    <LogOut />
                </button>
            </footer>
        </div>
    );
}
