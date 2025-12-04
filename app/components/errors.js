"use client";

export default function Error({ message }) {
  return (
    <section className="flex justify-center items-center py-16 px-4">
      <div className="w-full max-w-md rounded-2xl p-8 font-semibold text-center">
        <h1 className="font-bold">Something went wrong!</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="50"
          height="50"
          viewBox="0 0 48 48"
          className="ml-auto mr-auto mt-2 mb-1.5"
        >
          <path
            fill="#ef4444"
            d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
          ></path>
          <path
            fill="#ffffff"
            d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"
          ></path>
          <path
            fill="#ffffff"
            d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"
          ></path>
        </svg>
        <h2>
          Sorry, there was a problem loading{message && " " + message}. Please
          try again in a moment.
        </h2>
      </div>
    </section>
  );
}
