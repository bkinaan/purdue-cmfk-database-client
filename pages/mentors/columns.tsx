"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Mentor = {
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
};

export const columns: ColumnDef<Mentor>[] = [
  {
    accessorKey: "FirstName",
    header: "First Name",
  },
  {
    accessorKey: "LastName",
    header: "Last Name",
  },
  {
    accessorKey: "PrimaryStaffRole",
    header: "Primary Staff Role",
  },
  {
    accessorKey: "Paired",
    header: "Paired With",
  },
];
