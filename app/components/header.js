"use client";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { logout, user } = useUser();
  const router = useRouter();

  const handleClick = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      <header className="w-full relative flex md:justify-end justify-between items-center font-bold py-5 text-brand-contrast bg-brand">
        <h1 className="md:absolute md:left-1/2 md:-translate-x-1/2  md:text-2xl text-lg ml-5 md:ml-0">GP Digital Queue Management</h1>
        {user && (
          <button className="bg-background mr-4 w-20 hover:bg-brand-dark hover:cursor-pointer text-brand font-semibold p-2 rounded-xl transition-all shadow-sm focus:ring-2 focus:ring-brand-light" type="button" onClick={handleClick}>
            {" "}
            Log out{" "}
          </button>
        )}
      </header>
    </>
  );
}
