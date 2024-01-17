import React from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/login");
  };

  const handleSignUpClick = () => {
    router.push("/signup");
  };
  return (
    <div className="font-montserrat text-center pt-48">
      <div className="font-bold text-5xl">
        Purdue College Mentors for Kids Database
      </div>
      <div className="flex flex-col items-center">
        <button
          onClick={handleLoginClick}
          className="my-4 border-2 p-2 rounded-xl"
        >
          Log In
        </button>
        <button onClick={handleSignUpClick} className="border-2 p-2 rounded-xl">
          Sign Up
        </button>
      </div>
    </div>
  );
}
