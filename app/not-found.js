export default function NotFound() {
  return (
    <section className="flex justify-center items-center py-16 px-4 bg-background text-foreground">
      <div className="w-full max-w-md bg-neutral-50 shadow-lg rounded-2xl p-8 space-y-6 border border-neutral-100 text-center">
        <h1 className="font-bold">Page Not Found</h1>
        <p className="font-semibold">Could not find the requested resource.</p>
      </div>
    </section>
  );
}
