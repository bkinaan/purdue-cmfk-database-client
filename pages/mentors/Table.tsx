import { useEffect, useState } from "react";
import { Mentor, columns } from "./columns";
import { DataTable } from "./data-table";
import axios from "axios";

async function getData(): Promise<Mentor[]> {
  // TODO: fetch data
  let response;
  try {
    const jwt = sessionStorage.getItem("jwt");
    response = await axios.get("http://localhost:8080/api/v1/mentors", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default function Table() {
  const [data, setData] = useState<Mentor[]>([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
