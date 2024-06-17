import { useEffect, useState } from "react";
import { Buddy, columns } from "./buddy-columns";
import { DataTable } from "./data-table";
import axios from "axios";

async function getData(): Promise<Buddy[]> {
  let response;
  try {
    const jwt = localStorage.getItem("jwt");
    response = await axios.get("http://localhost:8080/api/v1/buddies", {
      headers: { Authorization: `Bearer ${jwt}` },
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default function Table() {
  const [data, setData] = useState<Buddy[]>([]);

  useEffect(() => {
    getData().then(setData);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
