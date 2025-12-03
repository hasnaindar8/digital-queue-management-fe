"use client";

import { useEffect, useState } from "react";
import { fetchListOfQueue, deleteQueueEntry } from "../../api.js";
import { useUser } from "context/UserContext.jsx";
import Loader from "@/components/loading.js";
import Link from "next/link.js";

export default function Dashboard() {
  const [queue, setQueue] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    fetchListOfQueue()
      .then((data) => {
        setQueue(data.queue);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        setError(null);
      });
  }, []);

  function capitalName(name) {
    return name.slice(0, 1).toUpperCase() + name.slice(1);
  }

  function removeQueueEntry(entryId) {
    if (!confirm("Are you sure to delete this from the queue?")) return;
    deleteQueueEntry(entryId).then(() => {
      fetchListOfQueue()
        .then((data) => {
          setQueue(data.queue);
        })
        .catch((error) => {
          setError(error);
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
          setError(null);
        });
    });
  }

  if (isLoading) return <Loader />;

  return (
    <>
      <section className="flex flex-col justify-center items-center py-16 px-4 bg-background text-foreground">
        <h1 className="mb-2">
          <b>Receptionist Name:</b>{" "}
          {capitalName(user.firstName) + " " + capitalName(user.surname)}
        </h1>
        {/* <Link href="/login">Sign out</Link> */}
        <div className="flex flex-wrap overflow-x-auto ">
          <table className="table-auto border-separate mx-auto my-4 w-3xl max-w-md bg-neutral-50 shadow-lg rounded-2xl p-6 border-neutral-100">
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
              {queue.map((element, index) => {
                return (
                  <tr key={element.entry_id}>
                    <td
                      className={`border border-gray-300 p-3 ${
                        index === queue.length - 1 ? "rounded-bl-2xl" : ""
                      }`}
                    >
                      {element.entry_id}
                    </td>

                    <td className="border border-gray-300 p-3">
                      {capitalName(element.first_name)}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {capitalName(element.surname)}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {element.phone_no}
                    </td>
                    <td className="border border-gray-300 p-3">
                      {element.label}
                    </td>
                    <td
                      className={`border border-gray-300 p-3 ${
                        index === queue.length - 1 ? "rounded-br-2xl" : ""
                      }`}
                    >
                      {element.status === "done" ? (
                        "Done"
                      ) : (
                        <button
                          className="h-auto w-32 p-2 rounded-lg bg-brand text-background hover:bg-brand-dark "
                          onClick={() => removeQueueEntry(element.entry_id)}
                        >
                          Mark as Served
                        </button>
                      )}
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
