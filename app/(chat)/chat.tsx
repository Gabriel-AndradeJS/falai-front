'use client'

import React, { useState } from "react";
import { ChatWindow } from "./components/chatWindow";
import { Friend, FriendList } from "./components/frindList";


export function Chat() {
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);


    React.useEffect(() => {
        const handleResize = () => {
            if (selectedFriend && window.innerWidth >= 768) {
                setSelectedFriend(null);
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [selectedFriend])

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const showChat = selectedFriend && isMobile;

    return (
        <div className="flex flex-col md:flex-row h-screen font-sans ">
            {(!showChat || !selectedFriend) && (
                <FriendList onSelect={setSelectedFriend} />
            )}

            {selectedFriend && (
                <div className={`${showChat ? "block" : "hidden"} md:block w-full`}>
                    <ChatWindow
                        friend={selectedFriend}
                        onBack={() => setSelectedFriend(null)}
                    />
                </div>
            )}
        </div>
    );
}