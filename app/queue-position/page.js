"use client";
import { useSocket } from "@/contexts/socketContext";
import { useEffect, useState } from "react";
import Loader from "@/components/loading";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";

export default function Page() {
  const socket = useSocket();
  const router = useRouter();
  const { user } = useUser();

  const [queueUpdate, setQueueUpdate] = useState(null);
  const [isLeaving, setIsLeaving] = useState(false);

  function handleClick() {
    setIsLeaving(true);

    fetch(`http://localhost:8080/api/queue/${user?.userId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Something went wrong");
        router.push("/join-queue");
      })
      .catch((err) => {
        console.error("Unable to leave queue: " + err);
      })
      .finally(() => {
        setIsLeaving(false);
      });
  }

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (data) => {
      console.log(`SOCKET listening on ${socket?.id}`);
      setQueueUpdate(data);
    };

    if (socket.connected) {
      socket.emit("queue:requestUpdate");
    } else {
      const onConnect = () => {
        socket.emit("queue:requestUpdate");
      };
      socket.on("connect", onConnect);
    }

    socket.on("queue:update", handleUpdate);

    return () => {
      socket.off("queue:update");
      socket.off("connect");
    };
  }, [socket]);

  if (!queueUpdate) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center py-16 px-4 bg-background text-foreground text-center">
      <main className="w-full max-w-md bg-background shadow-lg rounded-2xl p-8 space-y-6 border border-neutral-100">
        <h2 className="max-w-xs text-2xl font-semibold leading-10 tracking-tight">
          Where are you in the queue?
        </h2>
        <h2>Queue Length</h2>
        <p>{queueUpdate.queueLength}</p>

        <h2>Queue Position</h2>
        <p>{queueUpdate.position}</p>

        <h2>Estimated Time</h2>
        <p>{queueUpdate.estimatedWait}</p>

        <button
          className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-xl transition-all shadow-sm focus:ring-2 focus:ring-brand-light"
          onClick={handleClick}
          disabled={isLeaving}
        >
          Leave the Queue
        </button>
      </main>
    </div>
  );
}
