import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/router";

// const inter = Inter({ subsets: ["latin"] });

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

interface FormData {
  username: string;
  password: string;
}

export default function Home() {
  const api = "http://localhost:8080/api/v1";

  const [serverError, setServerError] = useState(false);

  // useForm hook with resolver and schema
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // allows routing to other pages
  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    setServerError(false);
    // convert form data to JSON for HTTP request
    const body = JSON.stringify({
      username: data.username,
      password: data.password,
    });

    try {
      const response = await axios.post(`${api}/login`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      sessionStorage.setItem("jwt", response.data);
      // const jwt = sessionStorage.getItem("jwt");
      router.push("/dashboard");
    } catch (err) {
      setServerError(true);
      console.error(err);
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  const handleSignUpClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    router.push("/signup");
  };

  return (
    <div className="text-black font-montserrat text-center pt-48">
      <div className="font-bold text-5xl">
        Purdue College Mentors for Kids Database
      </div>
      <div className="pt-4">
        {errors.username && errors.password && (
          <div>Incorrect username or password</div>
        )}
        {serverError && (
          <div>There was a problem with the network. Please try again.</div>
        )}
      </div>
      <form
        className="flex flex-col border-2 rounded-xl w-full m-auto max-w-96 pt-12 pb-8"
        onSubmit={handleFormSubmit}
      >
        <input
          className="border-2 m-auto w-full max-w-64 rounded-lg"
          {...register("username")}
          placeholder="username"
        />
        {/* display errors */}
        {/* {errors.username && <p>{errors.username.message}</p>} */}
        <input
          className="border-2 m-auto w-full max-w-64 rounded-lg mt-2"
          {...register("password")}
          placeholder="password"
        />
        {/* display errors */}
        {/* {errors.password && <p>{errors.password.message}</p>} */}
        <button
          className="border-2 m-auto w-full max-w-32 mt-2 rounded-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
      <div>
        Or <button onClick={handleSignUpClick}>sign up</button>
      </div>
    </div>
  );
}
