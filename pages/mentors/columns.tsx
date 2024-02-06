"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
    accessorKey: "ActivityDays",
    header: "Activity Days",
  },
  {
    accessorKey: "PrimaryStaffRole",
    header: "Primary Staff Role",
  },
  {
    accessorKey: "Paired",
    header: "Paired With",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const mentor = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(mentor.EmailAddress)}
            >
              Copy email address
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(mentor.Phone)}
            >
              Copy phone number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View mentor</DropdownMenuItem>
            <DropdownMenuItem>View little buddy</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
