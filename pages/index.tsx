import Image from "next/image";
import { Inter } from "next/font/google";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const inter = Inter({ subsets: ["latin"] });

interface Mentor {
  id: number;
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

interface Buddy {
  id: number;
  FirstName: string;
  LastName: string;
  School: string;
  GradeLevel: string;
  Allergies: string;
  MedicalConditions: string;
  DietaryRestrictions: string;
  CarriesInhaler: string;
  CarriesEpiPen: string;
  HasLearningSocialDevelopmentalEmotionalIssues: string;
  IssueDetails: string;
  Medications: string;
  Other: string;
  GuardianFirstName: string;
  GuardianLastName: string;
  GuardianRelationship: string;
  GuardianPrimaryPhone: string;
  GuardianAltPhone: string;
  GuardianEmailAddress: string;
  EmergencyContactFirstName: string;
  EmergencyContactLastName: string;
  EmergencyContactRelationship: string;
  EmergencyContactPhone1: string;
  SafetyNotes: string;
  ApprovedForPickupFirstName: string;
  ApprovedForPickupLastName: string;
  ApprovedForPickupRelationship: string;
  ApprovedForPickupPrimaryPhone: string;
  PairedWith: string;
  FavoriteSubject: string;
  HobbiesAndInterests: string;
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
  const [uploadType, setUploadType] = useState<"mentors" | "buddies">(
    "mentors"
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUploadType(e.target.value as "mentors" | "buddies");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(
      `http://localhost:8080/api/v1/${uploadType}/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      console.log("File uploaded successfully");

      const response = await axios.get(
        `http://localhost:8080/api/v1/${uploadType}`
      );
      if (uploadType === "mentors") {
        setMentors(response.data);
      }
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
        <select value={uploadType} onChange={handleUploadTypeChange}>
          <option value="mentors">Mentors</option>
          <option value="buddies">Buddies</option>
        </select>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
