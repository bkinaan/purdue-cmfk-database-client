import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/router";

const schema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  FirstName: z.string().min(1),
  LastName: z.string().min(1),
  EmailAddress: z.string().min(1),
});

interface FormData {
  username: string;
  password: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
}

export default function Signup() {
  const api = "http://localhost:8080/api/v1";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: FormData) => {
    const body = JSON.stringify({
      username: data.username,
      password: data.password,
      FirstName: data.FirstName,
      LastName: data.LastName,
      EmailAddress: data.EmailAddress,
      StaffRole: "",
      PairedWith: "",
    });

    console.log(body);

    try {
      const response = await axios.post(`${api}/signup`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("jwt", response.data);
      localStorage.setItem("username", data.username);
      router.push("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <div className="font-montserrat text-center">
      <form
        className="bg-teal font-montserrat flex flex-col rounded-xl w-full m-auto max-w-96 pt-12 pb-8 mt-36 justify-center text-teal"
        onSubmit={handleFormSubmit}
      >
        <div className="text-grey text-5xl font-black m-auto items-center text-center pb-8 w-full">
          Sign Up
        </div>
        <input
          className="border-2 border-teal m-auto w-full max-w-64 rounded-xl bg-grey text-xl pl-3 py-2 mt-2"
          {...register("username")}
          placeholder="username"
          type="username"
        />
        <input
          className="border-teal m-auto w-full max-w-64 mb-4 rounded-xl mt-2 bg-grey text-xl pl-3 py-2"
          {...register("password")}
          placeholder="password"
          type="password"
        />
        <input
          className="border-2 border-teal m-auto w-full max-w-64 rounded-xl bg-grey text-xl pl-3 py-2"
          {...register("FirstName")}
          placeholder="first name"
        />
        <input
          className="border-2 border-teal m-auto w-full max-w-64 rounded-xl bg-grey text-xl pl-3 py-2"
          {...register("LastName")}
          placeholder="last name"
        />
        <input
          className="border-2 border-teal m-auto w-full max-w-64 rounded-xl bg-grey text-xl pl-3 py-2"
          {...register("EmailAddress")}
          placeholder="email address"
        />
        <button
          className="m-auto w-full max-w-32 mt-2 my-8 px-4 py-2 text-grey text-lg bg-blue hover:bg-orange rounded-xl shadow-lg shadow-grey hover:translate-y-1 hover:shadow-md hover:shadow-grey transition duration-300 ease-in-out"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
