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
    if (!confirm("Are you sure you want to remove this entry?")) return;

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
      <section className="flex flex-col py-16 px-4 bg-background text-foreground">
        <h1 className="mb-2 text-center">
          <strong>Receptionist Name:</strong> {capitaliseName(user.firstName)}{" "}
          {capitaliseName(user.surname)}
        </h1>

        <div className="overflow-x-auto">
          <table className="table-auto border-separate mx-auto my-4 w-2xl bg-neutral-50 shadow-lg rounded-2xl p-6 border-neutral-100">
            <thead>
              <tr>
                <th className="border border-gray-300 p-3 bg-brand text-background rounded-tl-2xl font-semibold">
                  Queue Number
                </th>

                <th className="border border-gray-300 p-3 bg-brand text-background font-semibold">
                  Patient First Name
                </th>
                <th className="border border-gray-300 p-3 bg-brand text-background font-semibold">
                  Patient Surname
                </th>
                <th className="border border-gray-300 p-3 bg-brand text-background font-semibold">
                  Patient Phone No.
                </th>
                <th className="border border-gray-300 p-3 bg-brand text-background font-semibold">
                  Reason
                </th>
                <th className="border border-gray-300 p-3 bg-brand text-background font-semibold rounded-tr-2xl">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {queue.map((row, index) => {
                return (
                  <tr key={row.entry_id}>
                    <td
                      className={`border border-gray-300 p-3 ${
                        index === queue.length - 1 ? "rounded-bl-2xl" : ""
                      }`}
                    >
                      {index + 1}
                    </td>

                    <td className="border border-gray-300 p-3">
                      {capitaliseName(row.first_name)}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {capitaliseName(row.surname)}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {row.phone_no}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {row.reason_label}
                    </td>
                    <td
                      className={`border border-gray-300 p-3 ${
                        index === queue.length - 1 ? "rounded-br-2xl" : ""
                      }`}
                    >
                      <button
                        className="h-auto w-32 p-2 rounded-lg bg-brand text-background hover:bg-brand-dark "
                        onClick={() => removeQueueEntry(row.user_id)}
                      >
                        Mark as Served
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
