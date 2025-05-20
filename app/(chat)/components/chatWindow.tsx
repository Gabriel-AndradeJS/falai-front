import { Friend } from "./frindList";

export function ChatWindow({
    friend,
    onBack,
}: {
    friend: Friend;
    onBack: () => void;
}) {
    return (
        <section className="flex flex-col h-screen w-full">
            <header className="flex items-center gap-3 border-b border-gray-300 p-4">
                <button
                    onClick={onBack}
                    className="md:hidden text-sm text-blue-600 font-medium mr-2"
                >
                    ← Voltar
                </button>
                <div className="w-10 h-10 bg-amber-700 rounded-full"></div>
                <p className="font-medium text-lg">{friend.name}</p>
            </header>

            <main className="flex-1 overflow-y-auto p-4">
                <p className="text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit...
                </p>
            </main>

            <footer className="border-t border-gray-300 p-4 bg-white">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Digite sua mensagem..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-md hover:bg-blue-700">
                        Enviar
                    </button>
                </div>
            </footer>
        </section>
    );
}
