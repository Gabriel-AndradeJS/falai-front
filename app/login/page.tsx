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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const { signIn } = useAuth();

  async function onSubmit(data: LoginProps) {
    const { email, password } = data;

    const res = await signIn(email, password);
    console.log(res);
  }

  return (
    <div className="bg-black/90 w-full min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-lg shadow-lg">
        <Image src={logo} alt="logo" width={150} />
        <h1 className="text-2xl uppercase mb-4 text-white text-center">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center w-full gap-4"
        >
          <Input
            className="w-full text-white"
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          <Input
            className="w-full text-white"
            type="password"
            placeholder="Senha"
            {...register("password", { required: true })}
          />
          <Link
            href="/register"
            className="text-sm text-blue-500 hover:text-blue-700 self-start"
          >
            Não tem uma conta? Crie uma
          </Link>
          <button className="w-full bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 transition">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
