"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/loading.js";
import { useUser } from "@/contexts/userContext.js";
import { useSocket } from "@/contexts/socketContext.js";

export default function Dashboard() {
  const { user } = useUser();
  const socket = useSocket();

  const [queue, setQueue] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queueLength, setQueueLength] = useState(null);

  function fetchListOfQueue() {
    return fetch(`http://localhost:8080/api/queue/`).then((res) => {
      if (!res.ok) {
        throw new Error("Cannot get list of queue");
      }
      return res.json();
    });
  }

  function deleteQueueEntry(userId) {
    return fetch(`http://localhost:8080/api/queue/${userId}`, {
      method: "DELETE",
    }).then((res) => {
      if (!res.ok) {
        throw new Error("Cannot delete from the queue");
      }
      return res.status;
    });
  }

  useEffect(() => {
    fetchListOfQueue()
      .then((data) => {
        setQueue(data.queue);
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (data) => {
      console.log(`SOCKET listening on ${socket?.id}`);
      setQueueLength(data.length);
    };

    socket.on("queue:length", handleUpdate);

    return () => {
      socket.off("queue:length", handleUpdate);
    };
  }, [socket]);

  useEffect(() => {
    if (queueLength == null) return;

    fetchListOfQueue()
      .then((data) => {
        setQueue(data.queue);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  }, [queueLength]);

  function capitaliseName(name) {
    if (!name) return "";
    return name.slice(0, 1).toUpperCase() + name.slice(1);
  }

  function removeQueueEntry(userId) {
    if (!confirm("Are you sure you want to mark this patient as served?"))
      return;

    deleteQueueEntry(userId).then(() => {
      fetchListOfQueue()
        .then((data) => {
          setQueue(data.queue);
        })
        .catch((err) => {
          setError(err);
          console.error(err);
        });
    });
  }

  if (!user) return <Loader />;

  if (isLoading) return <Loader />;

  return (
    <>
      <section className="flex flex-col py-10 px-4 bg-background text-foreground">
        <h1 className="text-center text-xl md:text-2xl font-semibold mb-6">
          Receptionist:{" "}
          <span className="text-brand font-bold">
            {capitaliseName(user.firstName)} {capitaliseName(user.surname)}
          </span>
        </h1>

        <div className="w-full max-w-5xl mx-auto bg-background shadow-md rounded-2xl border border-neutral-200">
          <div className="overflow-x-auto rounded-2xl">
            <table className="min-w-full text-sm">
              <thead className="bg-brand text-brand-contrast sticky top-0">
                <tr>
                  <th className="p-4 text-left font-semibold">#</th>
                  <th className="p-4 text-left font-semibold">First Name</th>
                  <th className="p-4 text-left font-semibold">Surname</th>
                  <th className="p-4 text-left font-semibold">Phone</th>
                  <th className="p-4 text-left font-semibold">Reason</th>
                  <th className="p-4 font-semibold text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {queue.map((row, index) => {
                  return (
                    <tr
                      key={row.entry_id}
                      className="border-b border-neutral-200 hover:bg-neutral-50 transition"
                    >
                      <td className="p-4">{index + 1}</td>
                      <td className="p-4">{capitaliseName(row.first_name)}</td>
                      <td className="p-4">{capitaliseName(row.surname)}</td>
                      <td className="p-4">{row.phone_no}</td>
                      <td className="p-4">{row.reason_label}</td>
                      <td className="p-4 text-center">
                        <button
                          className="px-4 py-2 rounded-lg bg-brand text-white hover:bg-brand-dark transition font-medium shadow-sm"
                          onClick={() => removeQueueEntry(row.user_id)}
                        >
                          Mark Served
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {queue.length === 0 && (
            <p className="text-center py-6 text-neutral-600 italic">
              No patients currently in queue.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
