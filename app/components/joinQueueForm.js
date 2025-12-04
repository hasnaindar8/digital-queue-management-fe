"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";
import Loader from "./loading";
import Error from "./errors";

export default function JoinQueueForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("the join queue page");
  const [reasons, setReasons] = useState([]);
  const [selectedReason, setSelectedReason] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    fetch("http://localhost:8080/api/reasons")
      .then((res) => {
        if (!res.ok) throw new Error("Cannot get list of reasons");
        return res.json();
      })
      .then((data) => {
        setReasons(data.reasons);
        setMessage(null);
      })
      .catch((err) => {
        setError(err);
        console.err(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (!user) {
      return router.replace("/login"); // redirect to login page if not logged in
    }

    setIsJoining(true);
    setMessage("your request to join the queue");

    fetch("http://localhost:8080/api/queue/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.userId,
        reason_id: selectedReason,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Something went wrong");
        router.push("/queue-position");
        setMessage(null);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      })
      .finally(() => {
        setIsJoining(false);
      });
  }

  if (isJoining || isLoading) return <Loader message={message} />;
  if (error) return <Error message={message} />;

  return (
    <section className="min-h-[calc(100vh-150px)] flex items-center justify-center px-4 py-12 bg-background text-foreground">
      <form
        className="w-full max-w-md bg-neutral-50 shadow-xl rounded-2xl p-8 space-y-6 border border-neutral-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-2">
          Join the GP Queue
        </h2>

        <div className="flex flex-col space-y-2">
          <label
            htmlFor="reasons-dropdown"
            className="font-medium text-sm md:text-base"
          >
            Select your reason to join the queue
          </label>

          <select
            id="reasons-dropdown"
            value={selectedReason}
            onChange={(e) => setSelectedReason(Number(e.target.value))}
            className="border border-neutral-300 rounded-xl p-3 bg-background text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm md:text-base"
          >
            <option value="" disabled>
              Select a reason...
            </option>
            {reasons.map((reason) => {
              return (
                <option key={reason.reason_id} value={reason.reason_id}>
                  {reason.label}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-brand hover:bg-brand-dark hover:cursor-pointer text-brand-contrast font-semibold py-3 rounded-xl transition-all shadow-sm focus:ring-2 focus:ring-brand-light text-base"
          disabled={isJoining}
        >
          Join the Queue
        </button>
      </form>
    </section>
  );
}
