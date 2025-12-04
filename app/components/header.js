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
      <header className="w-full flex flex-row justify-between items-center text-xl md:text-2xl font-bold py-5 text-brand-contrast bg-brand">
        <h1 className="text-center flex-1">GP Digital Queue Management</h1>
        {user && (
          <button className="content-end bg-background hover:bg-brand-dark hover:cursor-pointer text-brand font-semibold py-3 rounded-xl transition-all shadow-sm focus:ring-2 focus:ring-brand-light" type="button" onClick={handleClick}>
            {" "}
            Log out{" "}
          </button>
        )}
      </header>
    </>
  );
}
