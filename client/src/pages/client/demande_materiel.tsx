import React, { useEffect, useState } from "react";
import { CreateDemande } from "../../component/client/createDemande";
import DataTableClient from "../../component/client/table_client";
import axios from "axios";
import { useDemandeStore } from "../../store/demad_store";
import { Material_Demand } from "../../models/model";
import { Demand_row } from "../../component/client/demand_row";
import api from "../../api/api";

export const Demande_Materiel = () => {
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [dataRow, setDataRow] = useState<Material_Demand | null>(null);

  const { demands, setDemands } = useDemandeStore((state: any) => ({
    demands: state.demands,
    setDemands: state.setDemands,
  }));

  useEffect(() => {
    api.get("/demands/get").then((response) => {
      console.log(response.data);
      setDemands([...response.data]);
    });
  }, []);

  const handleviewClick = (row: Material_Demand | null) => {
    setDataRow(row);
  };

  return (
    <>
      <div className="flex font-semibold bg-first-color  h-full justify-start">
        <div className="flex flex-col font-semibold  items-center m-8">
          <div className="flex justify-center items-center border-2 shadow-xl h-12 w-80 text-xl rounded-full m-2 mb-4 bg-white">
            <h1>demandes materiel :</h1>
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
            data={demands}
            columns={[
              "D_id",
              "Name",
              "Categorie",
              "Type",
              "Status",
              "Description",
            ]}
            handleviewClick={handleviewClick}
          />
          {isAdd && <CreateDemande setIsAdd={setIsAdd} />}
        </div>
        { dataRow && <Demand_row dataRow={dataRow} />}
      </div>
    </>
  );
};
