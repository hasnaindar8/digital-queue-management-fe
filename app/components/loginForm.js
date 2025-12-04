"use client";
import { useState } from "react";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const { login } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong");
        return response.json();
      })
      .then(({ user }) => {
        login(user);
        if (user.type === "patient") {
          router.push("/join-queue");
        } else {
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <section className="min-h-[calc(100vh-150px)] flex items-center justify-center px-4 py-12 bg-background text-foreground">
      <form
        className="w-full max-w-md bg-neutral-50 shadow-xl rounded-2xl p-8 space-y-6 border border-neutral-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-center">
          Welcome Back
          <br />
          <span className="text-neutral-600 font-medium text-sm md:text-base">
            Please enter your details
          </span>
        </h2>

        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="font-medium text-sm md:text-base">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-neutral-300 rounded-xl p-3 bg-background text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm md:text-base"
          />
          <label
            htmlFor="password"
            className="font-medium text-sm md:text-base"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-neutral-300 rounded-xl p-3 bg-background text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm md:text-base"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brand hover:bg-brand-dark hover:cursor-pointer text-brand-contrast font-semibold py-3 rounded-xl transition-all shadow-sm focus:ring-2 focus:ring-brand-light text-base"
        >
          Sign in
        </button>
        <p>
          Don't have an account?{" "}
          <Link href="/signup">
            <span className="text-brand underline decoration-solid">
              Sign up
            </span>
          </Link>
        </p>
      </form>
    </section>
  );
}
