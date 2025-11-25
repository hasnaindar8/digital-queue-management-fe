import Link from "next/link";

export default function Signup() {
  return (
    <>
      <form className="grid-cols border-2 border-blue-400 rounded-lg p-2 items-center w-150 mx-auto mt-3 max-w-full h-auto">
        <h1 className="p-7 text-center">Sign-up here</h1>
        <div className="grid grid-rows-7 items-center">
          <div className="grid grid-flow-row grid-cols-2">
            <label className="text-middle content-center">First Name:</label>
            <input className="p-2 m-2 border-2 rounded-lg " name="first-name" id="first-name" />
          </div>
          <div className="grid grid-flow-row grid-cols-2">
            <label className="text-middle content-center">Surname:</label>
            <input className="p-2 m-2 border-2 rounded-lg " name="surname" id="surname" />
          </div>
          <div className="grid grid-flow-row grid-cols-2">
            <label className="text-middle content-center">Email:</label>
            <input className="p-2 m-2 border-2 rounded-lg" name="email" id="email" />{" "}
          </div>
          <div className="grid grid-flow-row grid-cols-2">
            <label className="text-middle content-center">Password:</label>
            <input className="p-2 m-2 border-2 rounded-lg " name="password" id="password" type="password" />
          </div>
          <div className="grid grid-flow-row grid-cols-2">
            <label className="text-middle content-center">Confirm Password:</label>
            <input
              className="p-2 m-2 border-2 rounded-lg "
              name="confirm-password"
              id="confirm-password"
              type="password"
            />
          </div>
          <button className="bg-blue-400 rounded-lg p-3 m-2 hover:bg-blue-300 hover:cursor-pointer">Submit</button>
          <Link
            className="text-center not-last:rounded-lg p-3 m-2 hover:text-blue-300"
            href="http://localhost:3000"
          >
            Log-in{" "}
          </Link>
        </div>
      </form>
    </>
  );
}
