import React from "react";
import MentorTable from "./table/MentorTable";

export default function Mentors() {
  return (
    <div className="font-montserrat">
      <div className="pl-8 pt-8 text-5xl font-black text-center">Mentors</div>
      <div>
        <MentorTable></MentorTable>
      </div>
    </div>
  );
}
