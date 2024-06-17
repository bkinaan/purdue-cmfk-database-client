import React from "react";
import PairTable from "./table/PairTable";

export default function Pairs() {
  return (
    <div className="font-montserrat">
      <div className="pl-8 pt-8 text-5xl font-black text-center">
        Pairs Report
      </div>
      <div>
        <PairTable></PairTable>
      </div>
    </div>
  );
}
