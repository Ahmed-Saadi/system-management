import { useEffect, useState } from "react";
import DataTableClient from "../../component/client/table_client";
import { Demand_conger } from "../../models/model";
import { Demand_row } from "../../component/client/demand_row";
import { useDemandeCongéStore } from "../../store/demad_store";
import { CreateDemandeCongé } from "../../component/client/createDemandeCongé";
import api from "../../api/api";

export const Demande_Conger = () => {
  const [isAdd, setIsAdd] = useState<boolean>(false);
  const [dataRow, setDataRow] = useState<Demand_conger | null>(null);
  const [filterData,setFilterData]=useState<Demand_conger []>([])
  const { demands, setDemands } = useDemandeCongéStore((state: any) => ({
    demands: state.demands,
    setDemands: state.setDemands,
  }));

  useEffect(() => {
    api.get("/demands/conger/get").then((response) => {
      setDemands([...response.data]);
      setFilterData([...response.data])
    });
  }, []);

  const handleviewClick = (item: Demand_conger) => {
    setDataRow(item);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filtered = demands.filter((demand: Demand_conger) =>
      demand.name.toLowerCase().includes(value)
    );
    setFilterData(filtered);
  };
  return (
    <>
      <div className="flex bg-gray-100 h-full w-full">
        <div className="flex flex-col items-center bg-white h-full w-2/3 mx-4 my-8 rounded-lg shadow-lg p-4">
          <div className="flex justify-center items-center border-b-2 shadow-md h-12 w-full text-xl rounded-md mb-4 bg-blue-100 font-semibold">
            <h1>Demandes de Congés</h1>
          </div>

          <div className="flex justify-around w-full mb-4">
          <div className="flex  flex-col items-center justify-center ml-44">
              <input
                className="w-[600px] px-4 py-2 shadow rounded-full"
                type="text"
                placeholder="Search..."
                onChange={handleSearch}
              />
              <img
                className="absolute cursor-text w-8 mx-2 self-end"
                src="/icons/search-icon.svg"
                alt="search icon"
              />
            </div>
            <button
              className="bg-green-500 w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
              onClick={() => setIsAdd(true)}
            >
              <img
                src="/icons/create-icon.svg"
                alt="create button"
              />
            </button>
          </div>
          <DataTableClient
            data={filterData}
            columns={[
              "Dc_id",
              "Name",
              "Type",
              "Date_debut",
              "Date_fin",
              "Cause",
              "nb_days"
            ]}
            handleviewClick={handleviewClick}
          />
          {isAdd && <CreateDemandeCongé setIsAdd={setIsAdd} setFilterData={setFilterData}/>}
        </div>
        {dataRow && <Demand_row dataRow={dataRow} />}
      </div>
    </>
  );
};
