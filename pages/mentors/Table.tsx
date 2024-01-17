import { useEffect, useState } from "react";
import { Mentor, columns } from "./columns";
import { DataTable } from "./data-table";

function getData(): Mentor[] {
  // TODO: fetch data
  return [];
}

// export default async function Page() {
export default function Table() {
  const data: Mentor[] = [
    {
      id: 1,
      FirstName: "Bob",
      LastName: "Bobby",
      EmailAddress: "email@address.com",
      NonSchoolEmailAddress: "other@website.com",
      Phone: "2352353335",
      ActivityDays: "Tuesday",
      PrimaryStaffRole: "VP of Programming",
      SecondaryStaffRole: "",
      Paired: "Buddy Schmody",
    },
    {
      id: 2,
      FirstName: "Bob",
      LastName: "Bobby",
      EmailAddress: "email@address.com",
      NonSchoolEmailAddress: "other@website.com",
      Phone: "2352353335",
      ActivityDays: "Tuesday",
      PrimaryStaffRole: "VP of Programming",
      SecondaryStaffRole: "",
      Paired: "Buddy Schmody",
    },
    {
      id: 3,
      FirstName: "Bob",
      LastName: "Bobby",
      EmailAddress: "email@address.com",
      NonSchoolEmailAddress: "other@website.com",
      Phone: "2352353335",
      ActivityDays: "Tuesday",
      PrimaryStaffRole: "VP of Programming",
      SecondaryStaffRole: "",
      Paired: "Buddy Schmody",
    },
    {
      id: 4,
      FirstName: "Bob",
      LastName: "Bobby",
      EmailAddress: "email@address.com",
      NonSchoolEmailAddress: "other@website.com",
      Phone: "2352353335",
      ActivityDays: "Tuesday",
      PrimaryStaffRole: "VP of Programming",
      SecondaryStaffRole: "",
      Paired: "Buddy Schmody",
    },
    {
      id: 5,
      FirstName: "Bob",
      LastName: "Bobby",
      EmailAddress: "email@address.com",
      NonSchoolEmailAddress: "other@website.com",
      Phone: "2352353335",
      ActivityDays: "Tuesday",
      PrimaryStaffRole: "VP of Programming",
      SecondaryStaffRole: "",
      Paired: "Buddy Schmody",
    },
    {
      id: 6,
      FirstName: "Bob",
      LastName: "Bobby",
      EmailAddress: "email@address.com",
      NonSchoolEmailAddress: "other@website.com",
      Phone: "2352353335",
      ActivityDays: "Tuesday",
      PrimaryStaffRole: "VP of Programming",
      SecondaryStaffRole: "",
      Paired: "Buddy Schmody",
    },
    {
      id: 7,
      FirstName: "Bob",
      LastName: "Bobby",
      EmailAddress: "email@address.com",
      NonSchoolEmailAddress: "other@website.com",
      Phone: "2352353335",
      ActivityDays: "Tuesday",
      PrimaryStaffRole: "VP of Programming",
      SecondaryStaffRole: "",
      Paired: "Buddy Schmody",
    },
    {
      id: 8,
      FirstName: "Bob",
      LastName: "Bobby",
      EmailAddress: "email@address.com",
      NonSchoolEmailAddress: "other@website.com",
      Phone: "2352353335",
      ActivityDays: "Tuesday",
      PrimaryStaffRole: "VP of Programming",
      SecondaryStaffRole: "",
      Paired: "Buddy Schmody",
    },
    {
      id: 9,
      FirstName: "Bob",
      LastName: "Bobby",
      EmailAddress: "email@address.com",
      NonSchoolEmailAddress: "other@website.com",
      Phone: "2352353335",
      ActivityDays: "Tuesday",
      PrimaryStaffRole: "VP of Programming",
      SecondaryStaffRole: "",
      Paired: "Buddy Schmody",
    },
  ];
  //   const data = await getData();

  //   return (
  //     <div className="container mx-auto py-10">
  //       <DataTable columns={columns} data={data}></DataTable>
  //     </div>
  //   );
  // const [mentors, setMentors] = useState<Mentor[]>([]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const data = await getData();
  //     setMentors(data);
  //   }

  //   fetchData();
  // }, []);

  // if (mentors === null) {
  //   return <div>Loading...</div>;
  // }

  // const data = getData();

  const mentors = data.map((mentor) => ({
    id: mentor.id,
    FirstName: mentor.FirstName,
    LastName: mentor.LastName,
    EmailAddress: mentor.EmailAddress,
    NonSchoolEmailAddress: mentor.NonSchoolEmailAddress,
    Phone: mentor.Phone,
    ActivityDays: mentor.ActivityDays,
    PrimaryStaffRole: mentor.PrimaryStaffRole,
    SecondaryStaffRole: mentor.SecondaryStaffRole,
    Paired: mentor.Paired,
  }));

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
