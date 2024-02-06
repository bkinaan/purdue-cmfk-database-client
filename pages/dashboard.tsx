import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "./mentors/Table";

type Mentor = {
  id: number;
  username: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  NonSchoolEmailAddress: string;
  Phone: string;
  ActivityDays: string;
  PrimaryStaffRole: string;
  SecondaryStaffRole: string;
  Paired: string;
};

type Buddy = {
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
  Paired: string;
  FavoriteSubject: string;
  HobbiesAndInterests: string;
};

export default function Dashboard() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [FirstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const jwt = sessionStorage.getItem("jwt");
        const response = await axios.get(
          "http://localhost:8080/api/v1/mentors",
          { headers: { Authorization: `Bearer ${jwt}` } }
        );

        // handle a single mentor being returned vs a list
        if (Array.isArray(response.data)) {
          setMentors(response.data);
        } else {
          setMentors([response.data]);
        }
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
      username = window.sessionStorage.getItem("username");
      user = mentors.find((mentor: Mentor) => mentor.username === username);
      setFirstName(user?.FirstName || null);
    }
  }, [mentors]);

  // const username = sessionStorage.getItem("username");

  // const user = mentors.find((mentor: Mentor) => mentor.username === username);

  return (
    <div className="font-montserrat">
      <div className="text-5xl font-black ml-10 mt-10">Hello, {FirstName}!</div>
      <div>
        <Table></Table>
      </div>
    </div>
  );
}
