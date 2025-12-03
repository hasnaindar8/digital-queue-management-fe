export function fetchListOfQueue() {
  return fetch(`http://localhost:8080/api/queue/`).then((res) => {
    if (!res.ok) {
      throw new Error("Cannot get list of queue");
    }
    return res.json();
  });
}
export function deleteQueueEntry(userId) {
  return fetch(`http://localhost:8080/api/queue/${userId}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Cannot delete from the queue");
    }
    return res.status;
  });
}
