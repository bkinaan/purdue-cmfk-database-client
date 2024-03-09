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
  const [PairedWith, setPairedWith] = useState<string | null>(null);
  const [showMentorTable, setShowMentorTable] = useState<boolean>(false);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const jwt = localStorage.getItem("jwt");
        const response = await axios.get(
          "http://localhost:8080/api/v1/mentors",
          { headers: { Authorization: `Bearer ${jwt}` } },
        );

        // handle a single mentor being returned vs a list
        if (Array.isArray(response.data)) {
          setMentors(response.data);
        } else {
          setMentors([response.data]);

          // find who mentor is paired with
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchMentors();
  }, []);

  // let pairedWith: string | null;

  useEffect(() => {
    if (typeof window !== "undefined") {
      let user: Mentor | undefined;
      let username: string | null;
      username = window.localStorage.getItem("username");
      user = mentors.find((mentor: Mentor) => mentor.username === username);
      if (user?.PrimaryStaffRole || user?.SecondaryStaffRole) {
        console.log(user?.PrimaryStaffRole);
        console.log("running!");
        setShowMentorTable(true);
      }
      setFirstName(user?.FirstName || null);
      setPairedWith(user?.Paired || null);
      if (user === null) {
        setFirstName("Mentor");
      }
    }
  }, [mentors]);

  // const username = localStorage.getItem("username");

  // const user = mentors.find((mentor: Mentor) => mentor.username === username);

  return (
    <div className="font-montserrat">
      <div className="ml-10 mt-10 text-5xl font-black">Hello, {FirstName}!</div>
      <div className="ml-10 mt-10">Paired with: {PairedWith}</div>
      {showMentorTable && (
        <div>
          <Table></Table>
        </div>
      )}
    </div>
  );
}
