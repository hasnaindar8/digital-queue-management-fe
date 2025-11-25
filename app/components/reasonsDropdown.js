"use client";
import { useState } from "react";

export default function ReasonsDropdown() {
  const [selectedReason, setSelectedReason] = useState("");
  const [selectedTimeslot, setselectedTimeslot] = useState("");
  const reasons = [
    { id: 1, label: "Urgent medical issue" },
    { id: 2, label: "Routine GP appointment" },
    { id: 3, label: "Prescription request" },
    { id: 4, label: "Test results" },
    { id: 5, label: "Admin request (fit note, letters, forms)" },
    { id: 6, label: "Referral or hospital follow-up" },
    { id: 7, label: "Vaccinations / preventative care" },
    { id: 8, label: "Medication review" },
    { id: 9, label: "Mental health support" },
    { id: 10, label: "Other" },
  ];

  const timeslots = [
    { id: 1, label: "10:00 am - 10:15 am" },
    { id: 2, label: "10:15 am - 10:30 am" },
    { id: 3, label: "10:30 am - 10:45 am" },
    { id: 4, label: "10:45 am - 11:00 am" },
  ];

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Reason id: ", selectedReason);
    console.log("timeslot id: ", selectedTimeslot);
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
                <option key={reason.id} value={reason.id}>
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
        >
          Join The Queue
        </button>
      </form>
    </section>
  );
}
