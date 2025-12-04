"use client";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useUser();
  const router = useRouter();

  const handleClick = () => {
    logout();
    router.replace("/login");
  };

  return (
    <header className="w-full bg-brand text-brand-contrast shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 h-16">
        <h1 className="text-lg md:text-2xl font-bold">
          GP Digital Queue Management
        </h1>

        {user && (
          <button
            onClick={handleClick}
            className="bg-background text-brand font-semibold px-4 py-2 rounded-lg shadow-sm hover:bg-brand hover:text-brand-contrast hover:cursor-pointer transition-all text-sm md:text-base"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}
