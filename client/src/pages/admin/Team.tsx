import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { Team } from "../../models/model";

export const Teams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

  return (
    <div className="container mx-auto p-4 bg-first-color">
      <div className="bg-white w-full h-full">
        <div className="flex flex-col w-full items-end mt-4 justify-center border-b-2 border-gray-200 p-2">
          <h1 className="self-center text-2xl font-bold p-4 m-3 bg-gray-200 rounded-md  w-1/3 text-center">
            teams
          </h1>
          <button className="bg-blue-400 p-2 rounded-md mx-4 hover:bg-blue-600">
            create
          </button>
        </div>
      </div>
      <div className="flex"></div>
    </div>
  );
};
