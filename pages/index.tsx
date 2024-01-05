import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";
import fs from "fs";
import csv from "csv-parser";

const inter = Inter({ subsets: ["latin"] });

interface Mentor {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  non_school_email: string;
  phone: string;
  activity_days: string;
  role: string;
  second_role: string;
  paired_with: string;
}

export default function Home() {
  const [mentors, setMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/mentors"
        );
        setMentors(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMentors();
  }, []);

  return (
    <div>
      <h1>Mentors</h1>
      <ul className="text-white">
        {mentors.map((mentor: Mentor) => (
          <li key={mentor.id}>
            {mentor.first_name} {mentor.last_name}
          </li>
        ))}
      </ul>
    </div>
  );
}
