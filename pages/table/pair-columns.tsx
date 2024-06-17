"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Pair = {
  id: number;
  FirstName: string;
  LastName: string;
  Buddy: string;
};

export const columns: ColumnDef<Pair>[] = [
  {
    accessorKey: "FirstName",
    header: "First Name",
  },
  {
    accessorKey: "LastName",
    header: "Last Name",
  },
  {
    accessorKey: "PairedWith",
    header: "Little Buddy",
  },
];
