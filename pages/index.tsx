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

      console.log(response);
      sessionStorage.setItem("jwt", response.data);
      const jwt = sessionStorage.getItem("jwt");
      console.log(jwt);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <div className="text-black">
      {/* <div>Log in</div>
      <div>Username</div>
      <input type="text" />
      <div>Password</div>
      <input type="text" />
      <div></div>
      <button>Submit</button> */}
      <form onSubmit={handleFormSubmit}>
        <input {...register("username")} placeholder="username" />

        {/* display errors */}
        {/* {errors.username && <p>{errors.username.message}</p>} */}

        <input {...register("password")} placeholder="password" />

        {/* display errors */}
        {/* {errors.password && <p>{errors.password.message}</p>} */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
