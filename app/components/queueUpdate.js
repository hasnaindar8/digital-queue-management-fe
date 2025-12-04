"use client";
import { useSocket } from "@/contexts/socketContext";
import { useEffect, useState } from "react";
import Loader from "@/components/loading";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";

export default function QueueUpdate() {
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
    <section className="min-h-[calc(100vh-150px)] flex items-center justify-center px-4 py-12 bg-background text-foreground">
      <div className="w-full max-w-md bg-neutral-50 shadow-xl rounded-2xl p-8 space-y-6 border border-neutral-100">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-2">
          Live Queue Update
        </h2>

        <div className="flex flex-col space-y-2">
          <h3 className="font-medium text-sm md:text-base">
            <strong>Queue Length:</strong> {queueUpdate.queueLength}
          </h3>

          <h3 className="font-medium text-sm md:text-base">
            <strong>Queue Position:</strong> {queueUpdate.position}
          </h3>

          <h3 className="font-medium text-sm md:text-base">
            <strong>Estimated Waiting Time:</strong>{" "}
            {(queueUpdate.estimatedWait - (queueUpdate.estimatedWait % 60)) /
              60}{" "}
            mins{" "}
            {queueUpdate.estimatedWait % 60 !== 0 &&
              `${queueUpdate.estimatedWait % 60} secs`}
          </h3>
        </div>

        <button
          className="w-full bg-brand hover:bg-brand-dark text-brand-contrast font-semibold py-3 rounded-xl transition-all shadow-sm focus:ring-2 focus:ring-brand-light text-base"
          onClick={handleClick}
          disabled={isLeaving}
        >
          Leave the Queue
        </button>
      </div>
    </section>
  );
}
