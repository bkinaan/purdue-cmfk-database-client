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
        router.push("/login");
      } else {
        console.log("token is all good!");

        router.push("/dashboard");
      }
    } else {
      router.push("/login");
    }
  };

  const handleSignUpClick = () => {
    router.push("/signup");
  };
  return (
    <div className="font-montserrat flex items-center pt-48 text-center">
      <div className="text-teal w-2/3 p-4 text-7xl font-bold">
        <div className="m-auto max-w-md text-center">
          <div className="text-orange">Purdue</div>
          College Mentors for Kids
          <div className="text-purple">Database</div>
        </div>
      </div>
      <div className="text-grey '#EAE3D9' mt-8 flex w-1/3 max-w-fit flex-col items-center justify-center rounded-xl p-12 text-2xl">
        <button
          onClick={handleLoginClick}
          className="bg-teal hover:bg-orange shadow-grey hover:shadow-grey my-8 rounded-xl px-4 py-2 shadow-lg transition duration-300 ease-in-out hover:translate-y-1 hover:shadow-md"
        >
          Log In
        </button>
        <button
          onClick={handleSignUpClick}
          className="bg-teal hover:bg-orange shadow-grey hover:shadow-grey mb-8 rounded-xl px-4 py-2 shadow-lg transition duration-300 ease-in-out hover:translate-y-1 hover:shadow-md"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
