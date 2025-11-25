export default function Dashboard() {
  const queues = [
    {
      id: "1",
      reason: "Fever",
      patient: "Patient 1",
      time: "10:00 am",
      status: "done",
    },
    {
      id: "2",
      reason: "Shortness of breath",
      patient: "Patient 2",
      time: "10:30 am",
      status: "in a queue",
    },
    {
      id: "3",
      reason: "Allergy",
      patient: "Patient 3",
      time: "10:45 am",
      status: "in a queue",
    },
    {
      id: "4",
      reason: "Severe bleeding",
      patient: "Patient 4",
      time: "11:00 am",
      status: "in a queue",
    },
    {
      id: "5",
      reason: "Dental help",
      patient: "Patient 5",
      time: "11:15 am",
      status: "in a queue",
    },
    {
      id: "6",
      reason: "Minor injuries",
      patient: "Patient 6",
      time: "11:30 am",
      status: "in a queue",
    },
    {
      id: "7",
      reason: "Burns and scalds",
      patient: "Patient 7",
      time: "11:45 am",
      status: "in a queue",
    },
    {
      id: "8",
      reason: "Mental health",
      patient: "Patient 8",
      time: "12:00 am",
      status: "in a queue",
    },
  ];
  return (
    <>
      <div className="flex flex-col border-2 border-blue-600 rounded-lg p-2 items-center w-3xl mx-auto mt-3">
        <h1 className="mb-2">
          <b>Receptionist Name:</b> {"A name"}
        </h1>
        <table className="border-separate border border-gray-400 mx-auto my-4">
          <thead>
            <tr>
              <th className="border border-gray-300 bg-blue-400 p-3">
                Queue Number
              </th>
              <th className="border border-gray-300 bg-blue-400 p-3">Reason</th>
              <th className="border border-gray-300 bg-blue-400 p-3">
                Preferred Time Slot
              </th>
              <th className="border border-gray-300 bg-blue-400 p-3">
                Patient's Name
              </th>
              <th className="border border-gray-300 bg-blue-400 p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {queues.map((element) => {
              return (
                <tr key={element.id}>
                  <td className="border border-gray-300 p-3">{element.id}</td>
                  <td className="border border-gray-300 p-3">
                    {element.reason}
                  </td>
                  <td className="border border-gray-300 p-3">{element.time}</td>
                  <td className="border border-gray-300 p-3">
                    {element.patient}
                  </td>
                  <td className="border border-gray-300 p-3">
                    {element.status === "done" ? (
                      "Done"
                    ) : (
                      <button className="bg-blue-300 p-2 rounded-3xl">
                        In a queue
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
