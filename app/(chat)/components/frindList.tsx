'use client'
import Image from "next/image";
import { useState } from "react";
import logo from "@/public/logo.png";
export type Friend = {
    id: number;
    name: string;
};

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
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredFriends = mockFriends.filter(friend =>
        friend.name.toLowerCase().includes(searchTerm)
    );

    return (
        <aside className="w-full md:w-[25vw] min-w-[240px] border-r border-gray-300 p-4">
            <div className="flex flex-col items-center mb-4">
                <Image src={logo} alt="logo" width={90}/>
                <h2 className="text-xl font-semibold text-center mb-4">Conversas</h2>
            </div>
            <input
                onChange={handleChange}
                type="search"
                placeholder="Buscar..."
                className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
            />

            <div className="space-y-2">
                {filteredFriends.length > 0 ? (
                    filteredFriends.map((friend) => (
                        <div
                            key={friend.id}
                            onClick={() => onSelect(friend)}
                            className="flex items-center space-x-3 p-2 rounded-md hover:bg-blue-400 cursor-pointer"
                        >
                            <div className="w-10 h-10 bg-amber-700 rounded-full"></div>
                            <p>{friend.name}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm text-center">Nenhum amigo encontrado.</p>
                )}
            </div>
        </aside>
    );
}


