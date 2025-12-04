export default function ListEntry({
  patient,
  index,
  removeQueueEntry,
  capitaliseName,
  queue,
}) {
  return (
    <li className="flex flex-row flex-wrap">
      <div
        className={`border border-gray-300 p-3 w-25 ${
          index === queue.length - 1 ? "rounded-bl-2xl" : ""
        }`}
      >
        <p>{patient.entry_id}</p>
      </div>
      <div className="border border-gray-300 p-3 w-25">
        <p>{capitaliseName(patient.first_name)}</p>
      </div>
      <div className="border border-gray-300 p-3 w-25">
        <p>{capitaliseName(patient.surname)}</p>
      </div>
      <div className="border border-gray-300 p-3 w-30">
        <p>{patient.phone_no}</p>
      </div>
      <div className="border border-gray-300 p-3 w-30">
        <p>{patient.reason_label}</p>
      </div>
      <div
        className={`border border-gray-300 p-3 ${
          index === queue.length - 1 ? "rounded-br-2xl" : ""
        }`}
      >
        {patient.status === "done" ? (
          "Done"
        ) : (
          <button
            className="h-auto w-32 p-2 rounded-lg bg-brand text-background hover:bg-brand-dark hover:cursor-pointer"
            onClick={() => removeQueueEntry(patient.user_id)}
          >
            Mark as Served
          </button>
        )}
      </div>
    </li>
  );
}
