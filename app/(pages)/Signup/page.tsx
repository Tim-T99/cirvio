import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <div className="text-center flex flex-col gap-4">
        <h1>Welcome to NestFlux</h1>
        <h2>Sign Up</h2>

        <div className="flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email"
            className="bg-gray-900 p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-900 p-2 rounded"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="bg-gray-900 p-2 rounded"
          />
        </div>
        <button>Sign Up</button>
        <p>
          Already have an account?{" "}
          <Link href="/" className="font-bold">
            Log in
          </Link>
        </p>
      </div>
      
    </section>
  );
};

export default Signup;
