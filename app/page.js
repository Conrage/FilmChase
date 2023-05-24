"use client";

import Image from "next/image";
import Link from "next/link";
import Input from "../components/Input.js";
import PriButton from "../components/PrimaryButton";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";
import { db } from "../auth/firebase.js";
import { collection, addDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-nextjs-toast";

export default function Cadastro() {
const cadastrar = async () => {
    const email = document.getElementById("email").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value; // Texto temp para ser enviado pro webserver
      createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        toast.notify("Conta criada!", {
          duration: 5,
          type: "success",
        });

        // aqui 
        const docRef = await addDoc(collection(db, "users"), {
          email: email,
          name: name,
          uid: user.uid,
        });
        window.location.pathname = "/login";
      })
      // ate aqui

      .catch((error) => {
        if (password.length < 8) {
          toast.notify("A senha deve ter no mínimo 8 caracteres", {
            duration: 5,
            type: "error",
          });
        } else if (
          { error }.error.message ==
          "Firebase: Error (auth/email-already-in-use)."
        ) {
          toast.notify("Esse email ja foi cadastrado.", {
            duration: 5,
            type: "error",
          });
        } else {
          toast.notify("Sua conta não foi criada, tente novamente.", {
            duration: 5,
            type: "error",
          });
        }
      });
  };

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
              Crie uma conta nova
            </span>
            <span className="text-[#AC1A19] text-7xl">.</span>
          </div>

          <div className="font-mont mt-2">
            <span className="text-[#BABABA] sm:text-sm text-xs font-medium">
              Já tem uma conta?
            </span>
            <span className="text-[#AC1A19] sm:text-sm text-xs font-bold">
              <Link href="/login"> Entre</Link>
            </span>
            <div className=" mt-10">
              <Input placeholder="Nome" id="name" />
              <Input type="email" id="email" name="email" placeholder="Email" />
              <Input
                type={"password"}
                id="password"
                name="password"
                placeholder="Senha"
              />
            </div>
            <ToastContainer />
            <PriButton onClick={cadastrar}>Cadastrar</PriButton>
          </div>
        </div>
      </div>
    </main>
  );
}
