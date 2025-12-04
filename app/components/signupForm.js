"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function SignupForm() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    return fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        surname,
        email,
        phoneNumber,
        password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 409)
            throw new Error("Account already exists");
        }
        router.push("/login");
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  return (
    <section className="min-h-[calc(100vh-150px)] flex items-center justify-center px-4 py-12 bg-background text-foreground">
      <form
        className="w-full max-w-md bg-neutral-50 shadow-xl rounded-2xl p-8 space-y-6 border border-neutral-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-center">
          Sign up now
          <br />
          <span className="text-neutral-600 font-medium text-sm md:text-base">
            Create your account
          </span>
        </h2>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="firstName"
            className="font-medium text-sm md:text-base"
          >
            First name
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
            className="border border-neutral-300 rounded-xl p-3 bg-background text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm md:text-base"
          />
          <label htmlFor="surname" className="font-medium text-sm md:text-base">
            Surname
          </label>
          <input
            id="surname"
            type="text"
            value={surname}
            placeholder="Surname"
            onChange={(e) => setSurname(e.target.value)}
            className="border border-neutral-300 rounded-xl p-3 bg-background text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm md:text-base"
          />
          <label htmlFor="email" className="font-medium text-sm md:text-base">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            className="border border-neutral-300 rounded-xl p-3 bg-background text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm md:text-base"
          />
          <label
            htmlFor="phoneNumber"
            className="font-medium text-sm md:text-base"
          >
            Phone number
          </label>
          <input
            id="phoneNumber"
            type="text"
            value={phoneNumber}
            placeholder="Phone number"
            onChange={(e) => setPhoneNumber(e.target.value)}
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
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="border border-neutral-300 rounded-xl p-3 bg-background text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm md:text-base"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brand hover:bg-brand-dark hover:cursor-pointer text-brand-contrast font-semibold py-3 rounded-xl transition-all shadow-sm focus:ring-2 focus:ring-brand-light text-base"
        >
          Sign up
        </button>
        <p>
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-brand underline decoration-solid">
              Sign in
            </span>
          </Link>
        </p>
      </form>
    </section>
  );
}
