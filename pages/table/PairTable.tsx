import { useEffect, useState } from "react";
import { Pair, columns } from "./pair-columns";
import PairReport from "./pair-report";
import { DataTable } from "./data-table";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";

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

export default function Table() {
  const [schoolRequest, setSchoolRequest] = useState("");
  const [gradeRequest, setGradeRequest] = useState("");
  const [data, setData] = useState<Pair[]>([]);

  async function getData(): Promise<Pair[]> {
    let response;
    try {
      console.log(schoolRequest);
      console.log(gradeRequest);
      const jwt = localStorage.getItem("jwt");
      const api = "http://localhost:8080/api/v1";
      response = await axios.post(
        `${api}/pairs`,
        {
          school: schoolRequest,
          grade: gradeRequest,
        },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  useEffect(() => {
    getData().then(setData);
  }, [schoolRequest]);

  return (
    <div>
      <Credenza>
        <CredenzaTrigger asChild>
          <Button className="mx-auto block mt-8">Choose Filters</Button>
        </CredenzaTrigger>
        <CredenzaContent>
          <CredenzaHeader>
            <CredenzaTitle>Create Report</CredenzaTitle>
          </CredenzaHeader>
          <CredenzaBody>
            <PairReport
              setSchoolRequest={setSchoolRequest}
              setGradeRequest={setGradeRequest}
            />
          </CredenzaBody>
          <CredenzaFooter>
            <CredenzaClose asChild>
              <button>Close</button>
            </CredenzaClose>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
