"use client";

export default function Loader({ message }) {
  return (
    <section className="flex justify-center items-center py-16 px-4 bg-background text-brand-dark">
      <div className="w-full max-w-md rounded-2xl p-8 space-y-6 font-semibold text-center">
        <h2>Loading{message && " " + message}...</h2>
        <div
          className="inline-block h-8 w-8 animate-spin [animation-duration:2s] rounded-full border-4 border-solid border--brand border-e-transparent align-[-0.125em]"
          role="status"
        ></div>
      </div>
    </section>
  );
}
