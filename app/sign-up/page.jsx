import Link from "next/link";

export default function Signup() {
  return (
    <>
      <form className="flex flex-col border-2 border-amber-600 rounded-lg p-2 items-center w-150 mx-auto mt-3">
        <h1 className="p-7">Sign-up here</h1>
        <div className="grid grid-flow-col grid-rows-7 items-center">
          <div className="grid grid-flow-row grid-cols-2">
            <label>First Name:</label>
            <input className="p-2 m-2 border-2 rounded-lg " name="first-name" id="first-name" />
          </div>
          <div className="grid grid-flow-row grid-cols-2">
            <label>Surname:</label>
            <input className="p-2 m-2 border-2 rounded-lg " name="surname" id="surname" />
          </div>
          <div className="grid grid-flow-row grid-cols-2">
            <label>Email:</label>
            <input className="p-2 m-2 border-2 rounded-lg" name="email" id="email" />{" "}
          </div>
          <div className="grid grid-flow-row grid-cols-2">
            <label>Password:</label>
            <input className="p-2 m-2 border-2 rounded-lg " name="password" id="password" />
          </div>
          <div className="grid grid-flow-row grid-cols-2">
            <label>Confirm Password:</label>
            <input className="p-2 m-2 border-2 rounded-lg " name="confirm-password" id="confirm-password" />
          </div>
          <button className="bg-amber-600 rounded-lg p-3 m-2 hover:bg-amber-500">Submit</button>
          <Link
            className="text-centre indent-48 not-last:rounded-lg p-3 m-2 hover:text-blue-300"
            href="http://localhost:3000"
          >
            Log-in{" "}
          </Link>
        </div>
      </form>
    </>
  );
}
