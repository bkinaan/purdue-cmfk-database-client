"use client";

import { useState } from "react";
import { useRouter } from "next/router";

import axios from "axios";

import EditForm from "./buddy-edit-form";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

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

export type Buddy = {
  id: number;
  FirstName: string;
  LastName: string;
  School: string;
  GradeLevel: string;
  PairedWith: string;
};

export const columns: ColumnDef<Buddy>[] = [
  {
    accessorKey: "FirstName",
    header: "First Name",
  },
  {
    accessorKey: "LastName",
    header: "Last Name",
  },
  {
    accessorKey: "School",
    header: "School",
  },
  {
    accessorKey: "GradeLevel",
    header: "Grade Level",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const api = "http://localhost:8080/api/v1";
      const buddy = row.original;

      const handleDeleteClick = async (event: React.MouseEvent) => {
        event.preventDefault();
        const id = buddy.id;
        try {
          const jwt = localStorage.getItem("jwt");
          const getresponse = await axios.get(
            "http://localhost:8080/api/v1/mentors",
            { headers: { Authorization: `Bearer ${jwt}` } }
          );

          const response = await axios.delete(`${api}/buddies/${id}`, {
            headers: { Authorization: `Bearer ${jwt}` },
          });
          console.log(response);

          window.location.reload();
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
                <EditForm buddy={buddy}></EditForm>
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
