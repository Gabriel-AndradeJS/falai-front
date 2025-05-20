import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { MoveLeft } from "lucide-react";


export default function Register() {
    return (
        <div className="bg-black/90 w-full h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-[40vw] bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded shadow-lg">
                <div>
                    <Link href="/login" className="absolute top-4 left-4 flex gap-1 text-blue-500"><MoveLeft />voltar</Link>
                    <Image src={logo} alt="logo" width={200} />
                </div>
                <h1 className="text-2xl uppercase mb-2 text-white">Registrar</h1>
                <form action="" className="flex flex-col items-center justify-center w-full gap-4">
                    <Input className="w-[50%] text-white" type="text" placeholder="Nome" />
                    <Input className="w-[50%] text-white" type="email" placeholder="Email" />
                    <Input className="w-[50%] text-white" type="password" placeholder="Senha" />
                    <Input className="w-[50%] text-white" type="password" placeholder="Confirmar Senha" />
                    <button className="bg-blue-500 px-4 py-2 rounded text-white cursor-pointer">Registrar</button>
                </form>
            </div>
        </div>
    )
}