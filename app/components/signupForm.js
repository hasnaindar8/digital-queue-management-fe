"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Signup() {
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
    <form
      className="grid-cols border-2 border-blue-400 rounded-lg p-2 items-center w-150 mx-auto mt-3 max-w-full h-auto"
      onSubmit={handleSubmit}
    >
      <h1 className="p-7 text-center">Sign-up here</h1>
      <div className="grid grid-rows-7 items-center">
        <div className="grid grid-flow-row grid-cols-2">
          <label className="text-middle content-center">First Name:</label>
          <input
            className="p-2 m-2 border-2 rounded-lg "
            name="first-name"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="grid grid-flow-row grid-cols-2">
          <label className="text-middle content-center">Surname:</label>
          <input
            className="p-2 m-2 border-2 rounded-lg "
            name="surname"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div className="grid grid-flow-row grid-cols-2">
          <label className="text-middle content-center">Email:</label>
          <input
            type="email"
            className="p-2 m-2 border-2 rounded-lg"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
        </div>
        <div className="grid grid-flow-row grid-cols-2">
          <label className="text-middle content-center">Phone Number:</label>
          <input
            className="p-2 m-2 border-2 rounded-lg "
            name="phone-number"
            id="phone-number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="grid grid-flow-row grid-cols-2">
          <label className="text-middle content-center">Password:</label>
          <input
            className="p-2 m-2 border-2 rounded-lg "
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-400 rounded-lg p-3 m-2 hover:bg-blue-300 hover:cursor-pointer"
        >
          Submit
        </button>
        <Link
          className="text-center not-last:rounded-lg p-3 m-2 hover:text-blue-300"
          href="/login"
        >
          Log-in{" "}
        </Link>
      </div>
    </form>
  );
}
