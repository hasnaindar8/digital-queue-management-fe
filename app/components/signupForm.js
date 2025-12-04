"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <section className="flex justify-center items-center py-16 px-4 bg-background text-foreground">
    <form
      className="w-full max-w-md bg-neutral-50 shadow-lg rounded-2xl p-6  space-y-6 border border-neutral-100"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-center">Sign up Here</h2>
      <div className="flex flex-col space-y-2 ">
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr] grid-flow-row font-semibold">
          <label className="text-middle content-center">First Name:</label>
          <input
            className="p-2 m-2 ml-0 mr-0 border border-neutral-300 rounded-xl font-normal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
            name="first-name"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
       
          <label className="text-middle content-center">Surname:</label>
          <input
            className="p-2 m-2 ml-0 mr-0 border border-neutral-300 rounded-xl font-normal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
            name="surname"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <label className="text-middle content-center">Email:</label>
          <input
            type="email"
            className="p-2 m-2 ml-0 mr-0 border border-neutral-300 rounded-xl font-normal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <label className="text-middle content-center">Phone Number:</label>
          <input
            className="p-2 m-2 ml-0 mr-0 border border-neutral-300 rounded-xl font-normal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
            name="phone-number"
            id="phone-number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label className="text-middle content-center">Password:</label>
          <input
            className="p-2 m-2 ml-0 mr-0 border border-neutral-300 rounded-xl font-normal focus:outline-none focus:ring-1 focus:ring-brand focus:border-brand transition-all"
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:cursor-pointer"
        >
          Submit
        </button>
        <p>Already have an account?</p>
        <button
          className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-xl transition-all shadow-sm hover:cursor-pointer"
          onClick={()=>{router.push("/login")}}
        >
          Log in{" "}
        </button>
      </div>
    </form>
    </section>
  );
}
