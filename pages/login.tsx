import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/router";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

interface FormData {
  username: string;
  password: string;
}

export default function Login() {
  const api = "http://localhost:8080/api/v1";
  const [serverError, setServerError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

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

      localStorage.setItem("jwt", response.data);
      localStorage.setItem("username", data.username);
      // const jwt = localStorage.getItem("jwt");
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
    <div className="text-grey">
      <div className="pt-4">
        {errors.username && errors.password && (
          <div className="fixed text-teal">Incorrect username or password</div>
        )}
        {serverError && (
          <div className="fixed text-teal">
            There was a problem with the network. Please try again.
          </div>
        )}
      </div>

      <form
        className="bg-teal font-montserrat flex flex-col rounded-xl w-full m-auto max-w-96 pt-12 pb-8 mt-36 justify-center text-teal"
        onSubmit={handleFormSubmit}
      >
        <div className="text-grey text-5xl font-black m-auto items-center text-center pb-8 w-full">
          Log In
        </div>
        <input
          className="border-2 border-teal m-auto w-full max-w-64 rounded-xl bg-grey text-xl pl-3 py-2"
          {...register("username")}
          placeholder="username"
          type="username"
        />
        {/* display errors */}
        {/* {errors.username && <p>{errors.username.message}</p>} */}
        <input
          className="border-2 border-teal m-auto w-full max-w-64 mb-4 rounded-xl mt-2 bg-grey text-xl pl-3 py-2"
          {...register("password")}
          placeholder="password"
          type="password"
        />
        {/* display errors */}
        {/* {errors.password && <p>{errors.password.message}</p>} */}

        <button
          className="m-auto w-full max-w-32 mt-2 my-8 px-4 py-2 text-grey text-lg bg-blue hover:bg-orange rounded-xl shadow-lg shadow-grey hover:translate-y-1 hover:shadow-md hover:shadow-grey transition duration-300 ease-in-out"
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
