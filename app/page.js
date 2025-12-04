"use client";
import { useUser } from "@/contexts/userContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { user, loading } = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      if (user.type === "patient") {
        router.push("/join-queue");
      } else {
        router.push("/dashboard");
      }
    }
  }, [loading]);
}
