'use client'
import { Input } from "@/components/ui/input";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { useAuth } from "@/context/authContext";
import { z } from "zod";
import { useForm } from "react-hook-form";

interface LoginProps {
    email: string;
    password: string;
}

const schema = z.object({
  email: z.string().email({ message: "Insira um email válido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
});

export default function Login() {
    const { register, handleSubmit, formState: {errors} } = useForm<LoginProps>()
     const { signIn } = useAuth();

     async function onSubmit(data: LoginProps) {
        const { email, password } = data;

        const res = await signIn(email, password);
        console.log(res);
        
        }

    return (
        <div className="bg-black/90 w-full h-screen flex items-center justify-center">
            <div className="w-full mx-2 flex flex-col items-center justify-center md:w-[40vw] bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded shadow-lg">

                <Image src={logo} alt="logo" width={200} />
                <h1 className="text-2xl uppercase mb-2 text-white">Login</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-full gap-4">
                    <Input className="md:w-[50%] text-white" type="email" placeholder="Email" 
                    {...register("email", { required: true })}
                    />
                    <Input className="md:w-[50%] text-white" type="password" placeholder="Senha" 
                    {...register("password", { required: true })}
                    />
                    <Link href="/register" className="text-sm text-blue-500 hover:text-blue-700">Não tem uma conta? Crie uma</Link>

                    <button className="bg-blue-500 px-4 py-2 rounded text-white cursor-pointer">Entrar</button>
                </form>

            </div>
        </div>
    )
}