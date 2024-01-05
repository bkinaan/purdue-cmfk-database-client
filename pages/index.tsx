import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  non_school_email: string;
  phone: string;
  activity_days: string;
  paired_with: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/mentors"
        );
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <ul className="text-white">
        {users.map((user: User) => (
          <li key={user.id}>
            {user.first_name} {user.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
