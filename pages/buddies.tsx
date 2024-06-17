import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import BuddyTable from "./table/BuddyTable";
import { Button } from "@/components/ui/button";
import AddForm from "./buddy-add-form";

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

export default function Buddies() {
  return (
    <div className="font-montserrat">
      <div className="flex flex-row justify-center">
        <div className="pl-8 pt-8 text-5xl font-black">Little Buddies</div>
        <Credenza>
          <CredenzaTrigger asChild>
            <Button variant="outline" className="ml-8 mt-8">
              Add
            </Button>
          </CredenzaTrigger>
          <CredenzaContent>
            <CredenzaHeader>
              <CredenzaTitle>Add New Little Buddy</CredenzaTitle>
            </CredenzaHeader>
            <CredenzaBody>
              <AddForm></AddForm>
            </CredenzaBody>
            <CredenzaFooter>
              <CredenzaClose asChild>
                <button>Close</button>
              </CredenzaClose>
            </CredenzaFooter>
          </CredenzaContent>
        </Credenza>
      </div>
      <div>
        <BuddyTable></BuddyTable>
      </div>
    </div>
  );
}
