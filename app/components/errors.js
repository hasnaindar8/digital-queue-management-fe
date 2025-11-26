"use client";

export default function Error({ pageTopic }) {
  return (
    <section className="flex justify-center items-center py-16 px-4 bg-background text-foreground">
      <div className="w-full max-w-md bg-neutral-50 shadow-lg rounded-2xl p-8 space-y-6 border border-neutral-100 font-semibold text-center">
        <h1 className="font-bold">Something went wrong!</h1>
        <h2>Sorry, there was a problem loading {pageTopic}. Please try again in a moment.</h2>
      </div>
    </section>
  );
}