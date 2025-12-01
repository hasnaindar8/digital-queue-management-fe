export function fetchListOfQueue(articleId) {
  return fetch(`http://localhost:8080/api/queue/`).then((res) => {
    if (!res.ok) {
      throw new Error("Cannot get list of queue");
    }
    return res.json();
  });
}
export function deleteQueueEntry(entryId) {
  return fetch(`http://localhost:8080/api/queue/${entryId}`, {
    method: "DELETE",
  }).then((res) => {
    if (!res.ok) {
      throw new Error("Cannot delete from the queue");
    }
    return res.status;
  });
}
