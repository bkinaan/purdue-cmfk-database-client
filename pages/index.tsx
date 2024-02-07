import React from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      const decoded = jwtDecode(jwt);
      const date = new Date();

      if ((decoded.exp ?? 0) * 1000 < date.getTime()) {
        console.log("expired");
      } else {
        console.log("token is all good!");
      }

      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  };

  const handleSignUpClick = () => {
    router.push("/signup");
  };
  return (
    <div className="font-montserrat text-center pt-48 flex items-center">
      <div className="font-bold text-7xl text-teal w-2/3 p-4">
        <div className="max-w-md text-center m-auto">
          <div className="text-orange">Purdue</div>
          College Mentors for Kids
          <div className="text-purple">Database</div>
        </div>
      </div>
      <div className="flex flex-col w-1/3 items-center text-grey text-2xl bg-teal rounded-xl p-12 mt-8 max-w-fit justify-center">
        <button
          onClick={handleLoginClick}
          className="my-8 px-4 py-2 bg-blue hover:bg-orange rounded-xl shadow-lg shadow-grey hover:translate-y-1 hover:shadow-md hover:shadow-grey transition duration-300 ease-in-out"
        >
          Log In
        </button>
        <button
          onClick={handleSignUpClick}
          className="px-4 py-2 mb-8 bg-blue hover:bg-orange rounded-xl shadow-lg shadow-grey hover:translate-y-1 hover:shadow-md hover:shadow-grey transition duration-300 ease-in-out"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
