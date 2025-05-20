import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";

export default function Login() {
    return (
        <div className="bg-black/90 w-full h-screen flex items-center justify-center">
            <div className="flex flex-col items-center justify-center w-[40vw] bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded shadow-lg">

                <Image src={logo} alt="logo" width={200} />
                <h1 className="text-2xl uppercase mb-2 text-white">Login</h1>
                <form action="" className="flex flex-col items-center justify-center w-full gap-4">
                    <Input className="w-[50%] text-white" type="email" placeholder="Email" />
                    <Input className="w-[50%] text-white" type="password" placeholder="Senha" />
                    <Link href="/register" className="text-sm text-blue-500 hover:text-blue-700">Não tem uma conta? Crie uma</Link>

                    <button className="bg-blue-500 px-4 py-2 rounded text-white cursor-pointer">Entrar</button>
                </form>

            </div>
        </div>
    )
}