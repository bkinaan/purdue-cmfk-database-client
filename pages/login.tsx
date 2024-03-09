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
          <div className="text-teal fixed">Incorrect username or password</div>
        )}
        {serverError && (
          <div className="text-teal fixed">
            There was a problem with the network. Please try again.
          </div>
        )}
      </div>

      <form
        className="bg-teal font-montserrat text-teal m-auto mt-36 flex w-full max-w-96 flex-col justify-center rounded-xl pb-8 pt-12"
        onSubmit={handleFormSubmit}
      >
        <div className="text-grey m-auto w-full items-center pb-8 text-center text-5xl font-black">
          Log In
        </div>
        <input
          className="border-teal bg-grey m-auto w-full max-w-64 rounded-xl border-2 py-2 pl-3 text-xl"
          {...register("username")}
          placeholder="username"
          type="username"
        />
        {/* display errors */}
        {/* {errors.username && <p>{errors.username.message}</p>} */}
        <input
          className="border-teal bg-grey m-auto mb-4 mt-2 w-full max-w-64 rounded-xl border-2 py-2 pl-3 text-xl"
          {...register("password")}
          placeholder="password"
          type="password"
        />
        {/* display errors */}
        {/* {errors.password && <p>{errors.password.message}</p>} */}

        <button
          className="text-grey bg-blue hover:bg-orange shadow-grey hover:shadow-grey m-auto my-8 mt-2 w-full max-w-32 rounded-xl px-4 py-2 text-lg shadow-lg transition duration-300 ease-in-out hover:translate-y-1 hover:shadow-md"
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
