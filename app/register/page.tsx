import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function Register() {
    return (
        <div className="bg-black/90 w-full min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg shadow-lg">
                <div className="w-full relative flex items-center justify-center mb-4">
                    <Link href="/login" className="absolute left-0 top-0 flex items-center gap-1 text-blue-500">
                        <MoveLeft /> Voltar
                    </Link>
                    <Image src={logo} alt="logo" width={180} />
                </div>
                <h1 className="text-2xl uppercase mb-4 text-white text-center">Registrar</h1>
                <form className="flex flex-col items-center justify-center w-full gap-4">
                    <Input className="w-full text-white" type="text" placeholder="Nome" />
                    <Input className="w-full text-white" type="email" placeholder="Email" />
                    <Input className="w-full text-white" type="password" placeholder="Senha" />
                    <button className="w-full bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 transition">
                        Registrar
                    </button>
                </form>
            </div>
        </div>
    );
}
