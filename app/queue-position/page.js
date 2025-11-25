"use client"
import { useState } from "react";

export default function Page() {
  const [queuePosition, setQueuePosition] = useState(null);
  const [estWaitTime, setEstWaitTime] = useState("0 mins");

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          Where are you in the queue?
        </h1>
        <section>
          <h2>Queue Position</h2>
          {queuePosition || 1}
        </section>
        <section>
          <h2>Estimated Time</h2>
          {estWaitTime || "2 mins"}
        </section>
      </main>
    </div>
  );
}
