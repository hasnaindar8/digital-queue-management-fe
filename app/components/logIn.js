"use client";
import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return res.json();
      })
      .then(({ user }) => {
        login(user);
        router.push("/join-queue");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="flex justify-center items-center py-16 px-4 bg-background text-foreground">
      <form
        className="w-full max-w-md bg-neutral-50 shadow-lg rounded-2xl p-8 space-y-6 border border-neutral-100 content-center"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1 className="text-xl font-semibold text-center">Log in Here</h1>

        <div className="flex flex-col font-medium">
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] grid-flow-row font-semibold">
            <label className="text-middle content-center">Email:</label>
            <input
              type="email"
              className="p-2 m-2 mr-0 ml-0 border border-neutral-300 rounded-xl font-normal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all text-left"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-middle content-center">Password:</label>
            <input
              className="p-2 m-2 mb-0 mr-0 ml-0 border  border-neutral-300 rounded-xl font-normal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all text-left"
              name="password"
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="space-y-2">
          <button
            type="submit"
            className="w-full bg-brand hover:bg-brand-dark hover:cursor-pointer text-white font-semibold py-3 rounded-xl transition-all shadow-sm focus:ring-2 focus:ring-brand-light"
          >
            Log in
          </button>
          <p>Don't have an account?</p>
          <button
            type="button"
            className="w-full bg-brand hover:bg-brand-dark hover:cursor-pointer text-white font-semibold py-3 rounded-xl transition-all shadow-sm focus:ring-2 focus:ring-brand-light"
            onClick={() => {
              router.push("/signup");
            }}
          >
            Create an Account
          </button>
        </div>
      </form>
    </section>
  );
}
