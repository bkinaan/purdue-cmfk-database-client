import React, { useState, useEffect } from "react";
import axios from "axios";

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

export default function Dashboard() {
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
