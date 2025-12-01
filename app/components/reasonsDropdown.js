"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";

export default function ReasonsDropdown() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [reasons, setReasons] = useState([]);
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedTimeslot, setselectedTimeslot] = useState("");
  const [isJoining, setIsJoining] = useState(false);

  // const loggedInUser = useContext(LoginContext);
  // const userId = loggedInUser.userId

  const timeslots = [
    { id: 1, label: "10:00 am - 10:15 am" },
    { id: 2, label: "10:15 am - 10:30 am" },
    { id: 3, label: "10:30 am - 10:45 am" },
    { id: 4, label: "10:45 am - 11:00 am" },
  ];

  useEffect(() => {
    fetch("http://localhost:8080/api/reasons")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReasons(data.reasons);
      })
      .catch((err) => {
        console.err(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setIsJoining(true);
    console.log("Reason id: ", selectedReason);
    console.log("timeslot id: ", selectedTimeslot);

    fetch("http://localhost:8080/api/queue/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: loggedInUser.userId,
        reason_id: selectedReason,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        // router.push("/queue-position");
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsJoining(false);
      });
  }

  return (
    <section className="flex justify-center items-center py-16 px-4 bg-background text-foreground">
      <form
        className="w-full max-w-md bg-neutral-50 shadow-lg rounded-2xl p-8 space-y-6 border border-neutral-100"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold text-center">Join the GP Queue</h2>

        <div className="flex flex-col space-y-2">
          <label htmlFor="reasons-dropdown" className="font-medium">
            Select your reason to join the queue
          </label>

          <select
            id="reasons-dropdown"
            value={selectedReason}
            onChange={(e) => setSelectedReason(Number(e.target.value))}
            className="border border-neutral-300 rounded-xl p-3 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
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

        <div className="flex flex-col space-y-2">
          <label htmlFor="timeslot-dropdown" className="font-medium">
            Select your preferred timeslot for callback (Optional)
          </label>

          <select
            id="timeslot-dropdown"
            value={selectedTimeslot}
            onChange={(e) => setselectedTimeslot(Number(e.target.value))}
            className="border border-neutral-300 rounded-xl p-3 bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all"
          >
            <option value="" disabled>
              Select timeslot...
            </option>
            {timeslots.map((timeslot) => {
              return (
                <option key={timeslot.id} value={timeslot.id}>
                  {timeslot.label}
                </option>
              );
            })}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 rounded-xl transition-all shadow-sm focus:ring-2 focus:ring-brand-light"
          disabled={isJoining}
        >
          Join The Queue
        </button>
      </form>
    </section>
  );
}
