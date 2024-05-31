import { useEffect, useState } from "react";
import DataTableClient from "../../component/client/table_client";
import { Demand_congéer } from "../../models/model";
import { Demand_row } from "../../component/client/demand_row";
import { useDemandeCongéStore } from "../../store/demad_store";
import { CreateDemandeCongé } from "../../component/client/createDemandeCongé";
import axios from "axios";

export const Demande_Conger = () => {
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [dataRow, setDataRow] = useState<Demand_congéer | null>(null);
  const { demands, setDemands } = useDemandeCongéStore((state: any) => ({
    demands: state.demands,
    setDemands: state.setDemands,
  }));

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/demands/conger/get")
      .then((response) => {
        setDemands([...response.data]);
      });
  }, []);

  const handleviewClick = (item: Demand_congéer) => {
    setDataRow(item);
  };

  return (
    <>
      <div className="flex bg-first-color h-full w-full">
        <div className="flex flex-col  items-center bg-first-color h-full w-[64%] mx-4 my-8">
          <div className=" w-full flex flex-col">
            <div className="flex justify-center items-center border-2 shadow-xl h-12 w-80 text-xl rounded-full m-4 mb-4 bg-white font-semibold self-center">
              <h1>demandes de congés </h1>
            </div>

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
            <DataTableClient
              data={demands}
              columns={[
                "Dc_id",
                "Name",
                "Type",
                "Date_debut",
                "Date_fin",
                "Cause",
              ]}
              handleviewClick={handleviewClick}
            />
          </div>

          {isAdd && <CreateDemandeCongé setIsAdd={setIsAdd} />}
        </div>

        {dataRow && <Demand_row dataRow={dataRow} />}
      </div>
    </>
  );
};
