import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import Mentors from "./mentors";
import Buddies from "./buddies";
import Pairs from "./pairs";

type Mentor = {
  id: number;
  username: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  ActivityDays: string;
  StaffRole: string;
  PairedWith: string;
};

export default function Dashboard() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [FirstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await axios.get(
          "http://localhost:8080/api/v1/mentors",
          { headers: { Authorization: `Bearer ${jwt}` } }
        );

        setMentors([response.data]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchMentors();
  }, []);

  let username: string | null;
  let user: Mentor | undefined;

  useEffect(() => {
    if (typeof window !== "undefined") {
      username = window.localStorage.getItem("username");
      user = mentors.find((mentor: Mentor) => mentor.username === username);
      setFirstName(user?.FirstName || null);
    }
  }, [mentors]);

  return (
    <div>
      {/* <div className="text-5xl font-black">Hello, {FirstName}!</div> */}

      <div>
        <Mentors></Mentors>
        <Buddies></Buddies>
        <div>
          <div className="ml-10"></div>
          <Pairs></Pairs>
        </div>
      </div>
    </div>
  );
}
