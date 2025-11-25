import Link from "next/link";

export default function Login() {
  return (
    <>
      <form className="grid-cols border-2 border-blue-400 rounded-lg p-2 items-center w-150 mx-auto mt-3 max-w-full h-auto">
        <h1 className="p-7 text-center content-center">Login here</h1>
        <div className="grid-rows-2 items-center">
          <div className="grid grid-flow-row grid-cols-2 col grid-rows-1">
            <label className="indent-20 text-middle content-center">Email:</label>
            <input className="p-2 m-1 border-2 rounded-lg text-left" name="email" id="email" />
          </div>
          <div className="grid grid-flow-row grid-cols-2 ">
            <label className="indent-20 text-middle content-center">Password:</label>
            <input className="p-2 m-1 border-2 rounded-lg text-left" name="password" id="password" type="password" />
          </div>
        </div>
        <div>
          <button className="bg-blue-400 rounded-lg p-3 m-2 hover:bg-blue-300 hover:cursor-pointer">Login</button>
          <Link href="http://localhost:3000/sign-up">
            <button className="bg-blue-400 rounded-lg p-3 m-2 hover:bg-blue-300 hover:cursor-pointer">Create an account</button>
          </Link>
        </div>
      </form>
    </>
  );
}
