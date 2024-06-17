"use client";

import { useState } from "react";
import { useRouter } from "next/router";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import axios from "axios";

// modal ui
import {
  Credenza,
  CredenzaBody,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaFooter,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
} from "@/components/ui/credenza";

import EditForm from "./mentor-edit-form";

export type Mentor = {
  id: number;
  username: string;
  FirstName: string;
  LastName: string;
  EmailAddress: string;
  StaffRole: string;
  PairedWith: string;
};

export const columns: ColumnDef<Mentor>[] = [
  {
    accessorKey: "FirstName",
    header: "First Name",
  },
  // {
  //   accessorKey: "LastName",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Last Name
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "LastName",
    header: "Last Name",
  },
  {
    accessorKey: "EmailAddress",
    header: "Email Adress",
  },
  // {
  //   accessorKey: "StaffRole",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() !== "asc")}
  //       >
  //         Staff Role <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
  {
    accessorKey: "StaffRole",
    header: "Staff Role",
  },
  {
    accessorKey: "PairedWith",
    header: "Paired With",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const router = useRouter();
      const api = "http://localhost:8080/api/v1";
      const mentor = row.original;

      const handleDeleteClick = async (event: React.MouseEvent) => {
        event.preventDefault();
        const id = mentor.id;
        try {
          const jwt = localStorage.getItem("jwt");
          const getresponse = await axios.get(
            "http://localhost:8080/api/v1/mentors",
            { headers: { Authorization: `Bearer ${jwt}` } }
          );
          let mentors = getresponse.data;
          let username = window.localStorage.getItem("username");
          let user = mentors.find(
            (mentor: Mentor) => mentor.username === username
          );
          const userId = user.id;
          let self = false;
          if (mentor.id === userId) {
            self = true;
          }
          const response = await axios.delete(`${api}/mentors/${id}`, {
            headers: { Authorization: `Bearer ${jwt}` },
          });
          console.log(response);
          // check if user is deleting themselves

          if (self) {
            router.push("/");
          } else {
            window.location.reload();
          }
        } catch (e) {
          console.log(e);
        }
      };

      // const openCredenza = () => setIsCredenzaOpen(true);
      // const closeCredenza = () => setIsCredenzaOpen(false);

      return (
        <>
          <Credenza>
            <CredenzaTrigger asChild>
              <button>Edit</button>
            </CredenzaTrigger>
            <CredenzaContent>
              <CredenzaHeader>
                <CredenzaTitle>Edit</CredenzaTitle>
              </CredenzaHeader>
              <CredenzaBody>
                <EditForm mentor={mentor}></EditForm>
              </CredenzaBody>
              <CredenzaFooter>
                <CredenzaClose asChild>
                  <button>Close</button>
                </CredenzaClose>
              </CredenzaFooter>
            </CredenzaContent>
          </Credenza>
          <Button
            onClick={handleDeleteClick}
            variant="destructive"
            className="ml-4"
          >
            Delete
          </Button>
        </>
      );
    },
  },
];
