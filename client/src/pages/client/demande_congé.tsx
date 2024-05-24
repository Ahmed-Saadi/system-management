import React, { useState } from "react";
import DataTable from "../../component/admin/table_client";
import DataTableClient from "../../component/client/table_client";
import { Material_Demand } from "../../models/model";

export const Demande_Conger = () => {
  const [isAdd,setIsAdd] = useState<boolean>(false)
 
  const objects = [
    {
      dc_id: 1,
      name: "Object 1",
      type: "Type 1",
      date_debut: "2024-05-23",
      date_fin: "2024-05-25",
      cause: "Cause 1",
    },
    {
      dc_id: 2,
      name: "Object 2",
      type: "Type 2",
      date_debut: "2024-06-01",
      date_fin: "2024-06-05",
      cause: "Cause 2",
    },
    {
      dc_id: 3,
      name: "Object 3",
      type: "Type 3",
      date_debut: "2024-06-10",
      date_fin: "2024-06-15",
      cause: "Cause 3",
    },
    {
      dc_id: 4,
      name: "Object 4",
      type: "Type 4",
      date_debut: "2024-06-20",
      date_fin: "2024-06-25",
      cause: "Cause 4",
    },
  ];

  return (
    <>
      <div className="flex bg-first-color h-full">
        <div className="flex flex-col  items-center bg-first-color h-full w-3/5 mx-4">
          <div className="flex justify-center items-center border-2 shadow-xl h-12 w-80 text-xl rounded-full m-4 mb-4 bg-white font-semibold">
            <h1>demandes de congés </h1>
          </div>
          <div className="w-full">
            <div className="flex justify-center">
              <div className="flex justify-end items-center mx-20">
                <input
                  className="w-[400px] px-3 py-1 shadow rounded-full"
                  type="text"
                  placeholder="search ..."
                />
                <img
                  className="absolute cursor-text w-8 mx-2"
                  src="../public/icons/search-icon.svg"
                  alt="search icon "
                />
              </div>
              <button
                className=" border-2 bg-green-100  shadow-sm rounded-lg "
                onClick={() => setIsAdd(true)}
              >
                <img
                  src="../public/icons/create-icon.svg"
                  alt="create button"
                />
              </button>
            </div>
          </div>

          <DataTableClient
            data={objects}
            columns={[
              "dc_id",
              "name",
              "type",
              "date_debut",
              "date_fin",
              "cause",
            ]}
            handleviewClick={function (row: Material_Demand | null): void {
              throw new Error("Function not implemented.");
            }}
          />
        </div>
      </div>
    </>
  );
};
