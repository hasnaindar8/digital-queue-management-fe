"use client";

import { useEffect, useState } from "react";
import { fetchListOfQueue, deleteQueueEntry } from "../../api.js";
import { useUser } from "context/UserContext.jsx";
import Loader from "@/components/loading.js";
import ListEntry from "./listEntry.js";

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

  function capitaliseName(name) {
    return name.slice(0, 1).toUpperCase() + name.slice(1);
  }

  function removeQueueEntry(userId) {
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
    <section className="flex flex-col justify-center items-center py-16 px-4 bg-background text-foreground">
      <h1 className="mb-2">
        <b>Receptionist Name:</b>{" "}
        {capitaliseName(user.firstName) + " " + capitaliseName(user.surname)}
      </h1>
      <ul className="flex flex-col border-separate mx-auto my-4 bg-neutral-50 shadow-lg rounded-2xl p-6 border-neutral-100">
        <li className="flex flex-row">
          <p className="border border-gray-300 p-3 bg-brand text-background rounded-tl-2xl font-semibold w-25">
            Queue Number
          </p>
          <p className="border border-gray-300 p-3 bg-brand text-background font-semibold w-25">
            First Name
          </p>
          <p className="border border-gray-300 p-3 bg-brand text-background font-semibold w-25">
            Surname
          </p>
          <p className="border border-gray-300 p-3 bg-brand text-background font-semibold w-30">
            Phone No.
          </p>
          <p className="border border-gray-300 p-3 bg-brand text-background font-semibold w-30">
            Reason
          </p>
          <p className="border border-gray-300 p-3 bg-brand text-background font-semibold rounded-tr-2xl w-38.5">
            Action
          </p>
        </li>
        {queue.map((patient, index) => {
          return (
            <ListEntry
              key={patient.user_id}
              patient={patient}
              index={index}
              removeQueueEntry={removeQueueEntry}
              capitaliseName={capitaliseName}
              queue={queue}
            />
          );
        })}
      </ul>
    </section>
  );
}
