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
    <div>
      <div className="text-black">Sign Up</div>
      <div className="text-black">
        <form onSubmit={handleFormSubmit}>
          <input {...register("EmailAddress")} placeholder="email address" />
          <input {...register("username")} placeholder="username" />
          <input {...register("password")} placeholder="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}