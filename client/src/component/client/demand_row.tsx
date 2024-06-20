import React from "react";

interface Props {
  dataRow: any;
}

export const Demand_row: React.FC<Props> = ({ dataRow }) => {
  return (
    <div className="h-full m-4 w-1/3">
      <div className="flex flex-col justify-start items-center border-2 border-red-200 font-serif p-4 bg-gray-100 rounded-lg shadow-lg">
        <div className="flex p-4 shadow-xl font-semibold text-xl m-2 bg-white rounded-full">
          <h1>Demand Information</h1>
        </div>
        {Object.keys(dataRow).map((key) => (
          key !== "comment"&& key !=="response"&& (<div key={key} className="demand_view_row flex items-center mb-2">
            <p className="font-semibold text-lg mr-4">{key}:</p>
            <p className="text-base">{dataRow[key]}</p>
          </div>)
        ))}
        {dataRow.description && (
          <div className="demand_view_row description-view">
            <p className="font-semibold text-lg mb-2">Description:</p>
            <p className="rounded-sm p-2 my-2 w-full overflow-y-auto scrollbar text-end">
              {dataRow.description}
            </p>
          </div>
        )}
        {(dataRow.comment && dataRow.status === "closed") && (
          <div className="demand_view_row comment-view">
            <p className="font-semibold text-lg mb-2">Comment:</p>
            <p>{dataRow.comment}</p>
          </div>
        )}
      </div>
    </div>
  );
};
