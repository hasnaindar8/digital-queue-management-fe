"use client";
import Link from "next/link";
import { useState, createContext, use } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()
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
        router.push("/")
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <form
      className="grid-cols shadow-lg rounded-lg p-2 items-center w-150 mx-auto mt-3 max-w-full h-auto bg-white text-black"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <h1 className="p-7 text-center content-center">Login here</h1>
      <div className="grid-rows-2 items-center">
        <div className="grid grid-flow-row grid-cols-2 col grid-rows-1">
          <label className="indent-20 text-middle content-center">Email:</label>
          <input
            type="email"
            className="p-2 m-1 border-2 rounded-lg text-left"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid grid-flow-row grid-cols-2 ">
          <label className="indent-20 text-middle content-center">
            Password:
          </label>
          <input
            className="p-2 m-1 border-2 rounded-lg text-left"
            name="password"
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-400 rounded-lg p-3 m-2 hover:bg-blue-300 hover:cursor-pointer "
        >
          Login
        </button>
        <Link href="http://localhost:3000/sign-up">
          <button
            type="button"
            className="bg-blue-400 rounded-lg p-3 m-2 hover:bg-blue-300 hover:cursor-pointer"
          >
            Create an account
          </button>
        </Link>
      </div>
    </form>
  );
}
