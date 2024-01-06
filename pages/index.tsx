import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      "http://localhost:8080/api/v1/mentors/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      console.log("File uploaded successfully");

      const response = await axios.get("http://localhost:8080/api/v1/mentors");
      setMentors(response.data);
    } else {
      console.error("Error uploading file");
    }
  };

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
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
