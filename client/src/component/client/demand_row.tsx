import React from "react";

interface props {
  dataRow: any;
}
export const Demand_row: React.FC<props> = ({ dataRow }) => {
  return (
    <>
      <div className=" h-full m-4 w-1/3">
        <div className="flex flex-col justify-start  items-center  border-2 border-red-200 font-serif  p-4 bg-second-color">
          <div className=" flex p-4 shadow-xl font-semibold text-2xl m-2 bg-white rounded-full">
            <h1>Demand Information :</h1>
          </div>
          {Object.keys(dataRow).map((key, index) => {
            if (key === "description") {
              return (
                <div key={index} className="block demand_view_row h-50">
                  <p>{key} :</p>
                  <p className="font-normal bg-white  w-full h-48 rounded-sm overflow-y-auto p-2 my-2 scrollbar ">
                    {dataRow[key]}
                  </p>
                </div>
              );
            } else {
              return (
                <div key={index} className="demand_view_row">
                  <p>{key}:</p>
                  <p>{dataRow[key]}</p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};
