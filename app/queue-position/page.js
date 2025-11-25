"use client"
import { useState } from "react";

export default function Page() {
  const [queuePosition, setQueuePosition] = useState(null);
  const [estWaitTime, setEstWaitTime] = useState("0 mins");

  return (
    <div className="flex justify-center items-center py-16 px-4 bg-background text-foreground text-center">
      <main className="w-full max-w-md bg-background shadow-lg rounded-2xl p-8 space-y-6 border border-neutral-100">
        <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight">
          Where are you in the queue?
        </h2>
        <section>
          <h2 className="">Queue Position</h2>
          {queuePosition || 1}
        </section>
        <section>
          <h2 >Estimated Time</h2>
          {estWaitTime || "2 mins"}
        </section>
        <button className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-xl transition-all shadow-sm focus:ring-2 focus:ring-brand-light">
          Leave the Queue
        </button>
      </main>
    </div>
  );
}
