"use client";

import { useEffect, useState } from "react";
import { fetchListOfQueue, deleteQueueEntry } from "../../api.js";
export default function Dashboard() {
  const [queue, setQueue] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchListOfQueue()
      .then((data) => {
        setQueue(data.queue);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
        console.log(error);
      });
  }, []);

  function removeQueueEntry(entryId) {
    if (!confirm("Are you sure to delete this from the queue?")) return;
    deleteQueueEntry(entryId).then(() => {
      fetchListOfQueue()
        .then((data) => {
          setQueue(data.queue);
          setLoading(false);
          setError(null);
        })
        .catch((error) => {
          setLoading(false);
          setError(error);
          console.log(error);
        });
    });
  }

  if (isLoading) return <p className="text-center mt-5 text-xl">Loading</p>;

  return (
    <>
      <div className="flex flex-col border-2  rounded-lg p-2 items-center w-3xl mx-auto mt-3">
        <h1 className="mb-2">
          <b>Receptionist Name:</b> {user.firstName}
        </h1>
        <table className="border-separate border border-gray-400 mx-auto my-4">
          <thead>
            <tr>
              <th
                className="border border-gray-300 p-3"
                style={{ backgroundColor: "var(--brand-light)" }}
              >
                Queue Number
              </th>

              <th
                className="border border-gray-300 p-3"
                style={{ backgroundColor: "var(--brand-light)" }}
              >
                Patient First Name
              </th>
              <th
                className="border border-gray-300 p-3"
                style={{ backgroundColor: "var(--brand-light)" }}
              >
                Patient Surname
              </th>
              <th
                className="border border-gray-300 p-3"
                style={{ backgroundColor: "var(--brand-light)" }}
              >
                Patient Phone No.
              </th>
              <th
                className="border border-gray-300 p-3"
                style={{ backgroundColor: "var(--brand-light)" }}
              >
                Reason
              </th>
              <th className="border border-gray-300 bg-blue-400 p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((element) => {
              return (
                <tr key={element.entry_id}>
                  <td className="border border-gray-300 p-3">
                    {element.entry_id}
                  </td>

                  <td className="border border-gray-300 p-3">
                    {element.first_name}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {element.surname}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {element.phone_no}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {element.label}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {element.status === "done" ? (
                      "Done"
                    ) : (
                      <button
                        className="bg-blue-300 p-2 rounded-lg hover:bg-blue-500"
                        onClick={() => removeQueueEntry(element.entry_id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
