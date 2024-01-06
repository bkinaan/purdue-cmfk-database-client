import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useEffect } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

interface Mentor {
  id?: number;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  NonSchoolEmailAddress: string;
  Phone: string;
  ActivityDays: string;
  PrimaryStaffRole: string;
  SecondaryStaffRole: string;
  Paired: string;
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
            {mentor.FirstName} {mentor.LastName}
          </li>
        ))}
      </ul>
    </div>
  );
}
