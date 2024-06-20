import React from "react";
import { Team } from "../../models/model";

interface props{
  setTeam:React.Dispatch<React.SetStateAction<Team | null>>;
  team:Team | null;
}
export const ShowTeam:React.FC<props> = ({setTeam,team}) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-end ">
        <div className="bg-white p-4 rounded shadow-lg relative w-[400px] h-[900px] mt-16">
          <button className="absolute top-0 right-0 m-2 text-gray-700 hover:text-gray-900" onClick={()=>setTeam(null)}>
            <img src="/icons/double-arrow-icon.svg" alt="close Btn" />
          </button>
          <p>Team:</p>
        </div>
        <div className="flex flex-col">
            <div className="flex">
            <p>chef d'équipe</p>
            <p>{team?.teamLeader.firstname } {" "} {team?.teamLeader.lastname}</p>
            </div>
            <div className="flex flex-col">
              {
                team?.members.map((membre) => 
                  <div>{membre.firstname} {' '} {membre.lastname}</div>
                )
              }
            </div>

        </div>
      </div>
    </>
  );
};
