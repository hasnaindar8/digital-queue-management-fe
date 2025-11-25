import Link from "next/link";

export default function Login() {
  return (
    <>
      <form className="flex flex-col border-2 border-amber-600 rounded-lg p-2 items-center w-150 mx-auto mt-3">
        <h1>Login here</h1>
        <div className="grid grid-flow-col grid-rows-2 items-center">
          <div className="grid grid-flow-row grid-cols-2">
            <label className="indent-30 text-middle content-center">Username:</label>
            <input className="p-2 m-1 border-2 rounded-lg text-left" name="username" id="username" />
          </div>
          <div className="grid grid-flow-row grid-cols-2 ">
            <label className="indent-30 text-middle content-center">Password:</label>
            <input className="p-2 m-1 border-2 rounded-lg text-left" name="password" id="password" />
          </div>
        </div>
        <div>
          <button className="bg-amber-600 rounded-lg p-3 m-2 hover:bg-amber-500">Login</button>
          <Link className="bg-amber-600 rounded-lg p-3 m-2 hover:bg-amber-500" href="http://localhost:3000/sign-up">
            Create an account{" "}
          </Link>
      
        </div>
      </form>
      
    </>
  );
}
