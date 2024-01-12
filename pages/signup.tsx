import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/router";

const schema = z.object({
  EmailAddress: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
});

interface FormData {
  EmailAddress: string;
  username: string;
  password: string;
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
      EmailAddress: data.EmailAddress,
      username: data.username,
      password: data.password,
    });

    try {
      const response = await axios.post(`${api}/signup`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      sessionStorage.setItem("jwt", response.data);
      const jwt = sessionStorage.getItem("jwt");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  const handleFormSubmit = handleSubmit(onSubmit);

  return (
    <div className="text-black font-montserrat text-center pt-48">
      <div className="font-bold text-5xl">Sign Up</div>
      <form className="flex flex-col pt-4" onSubmit={handleFormSubmit}>
        <input
          className="border-2 m-auto w-full max-w-64 rounded-lg"
          {...register("EmailAddress")}
          placeholder="email address"
        />
        <input
          className="border-2 m-auto w-full max-w-64 rounded-lg mt-2"
          {...register("username")}
          placeholder="username"
        />
        <input
          className="border-2 m-auto w-full max-w-64 rounded-lg mt-2"
          {...register("password")}
          placeholder="password"
        />
        <button className="mt-4" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
