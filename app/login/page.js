"use client";

import Image from "next/image";
import Link from "next/link";
import Input from "../../components/Input.js";
import PriButton from "../../components/PrimaryButton.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../auth/firebase";
import { toast, ToastContainer } from "react-nextjs-toast";

export default function Login() {
  const entrar = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        localStorage.setItem('uid', auth.currentUser.uid)
        toast.notify("Você está sendo logado...", {
          duration: 5,
          type: "success",
        });
        window.location.pathname = "/homepage";
      })
      .catch((error) => {
        console.log({error}.error);
        toast.notify("A senha ou o email estão errados.", {
          duration: 5,
          type: "error",
        });
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <main className="flex min-h-screen flex-col bg-movie">
      <div className="mt-10 ml-10 xs:ml-20">
        <div className="font-mont">
          <span className="text-white font-light">Film</span>
          <span className="text-[#AC1A19] font-bold">Chase</span>
        </div>

        <div className="mt-20">
          <div className=" font-mont font-bold">
            <span className="text-white sm:text-4xl text-2xl">
              Entre na sua conta
            </span>
            <span className="text-[#AC1A19] text-7xl">.</span>
          </div>

          <div className="font-mont mt-2">
            <span className="text-[#BABABA] sm:text-sm text-xs font-medium">
              Não tem uma conta?
            </span>
            <span className="text-[#AC1A19] sm:text-sm text-xs font-bold">
              <Link href="/"> Cadastre</Link>
            </span>
            <div className=" mt-10">
              <Input type="email" id="email" name="email" placeholder="Email" />
              <Input
                type={"password"}
                id="password"
                name="password"
                placeholder="Senha"
              />
            </div>
            <ToastContainer />
            <PriButton onClick={entrar}>Entrar</PriButton>
          </div>
        </div>
      </div>
    </main>
  );
}
