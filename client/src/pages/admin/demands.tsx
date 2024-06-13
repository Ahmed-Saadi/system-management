import { useEffect, useState } from "react";
import DataTable from "../../component/admin/table_admin";
import { Material_Demand } from "../../models/model";
import api from "../../api/api";

export const Demande: React.FC = () => {
  const [demands, setDemands] = useState<Material_Demand[]>([]);
  const [showRow, setShowRow] = useState<Material_Demand | null>();
  const [ismodify, setIsmodify] = useState<boolean>(false);

  useEffect(() => {
    api.get("/demands/get").then((response) => {
      console.log(response.data);
      setDemands(response.data);
    });
  }, []);

  const handleSubmitBtn = (e: React.FormEvent<HTMLFormElement>,demande:Material_Demand) => {
    e.preventDefault();

    const form = e.currentTarget;
    const selectElement = form.querySelector("select");
    const textareaElement = form.querySelector("textarea");

    if (selectElement && textareaElement) {
      const status = selectElement.value;
      const comment = textareaElement.value;
      const formData = {
        "id":demande.d_id,
        "status":status,
        "comment":comment,
        
      }
      console.log(formData)

      api.post("/demands/material/update",formData).then((response) =>{ 
        console.log(response.data)
      })
      
      selectElement.value = "accepter";
      textareaElement.value = "";
    }
  };

  return (
    <>
      <div className="flex  w-full bg-first-color p-8">
        <div className="flex flex-col items-center justify-start flex-1">
          <div className="font-bold text-4xl py-6 bg-white   rounded-3xl  shadow-md  w-64 flex items-center justify-center">
            <h1>Demandes</h1>
          </div>
          <div className="flex">
            <DataTable
              data={demands}
              columns={[
                "D_id",
                "Name",
                "Categorie",
                "Type",
                "Status",
                "Description",
              ]}
              handleviewClick={setShowRow}
            />
          </div>
        </div>
        {showRow && (
          <div className="w-[40%]  flex flex-col justify-start my-24">
            <div className="bg-white rounded-lg shadow-lg ">
              <div className="px-4 py-2 border-b flex justify-between items-center">
                <h2 className="text-xl font-semibold">Demand Details</h2>
              </div>
              <div className="p-4">
                <div className="mb-4 flex justify-between mx-4">
                  <span className="font-semibold">ID: </span>
                  <span>{showRow.d_id}</span>
                </div>
                <div className="mb-4 flex justify-between mx-4">
                  <span className="font-semibold">Name: </span>
                  <span>{showRow.name}</span>
                </div>
                <div className="mb-4 flex justify-between mx-4">
                  <span className="font-semibold">Categorie: </span>
                  <span>{showRow.categorie}</span>
                </div>
                <div className="mb-4 flex justify-between mx-4">
                  <span className="font-semibold">Descritpion:</span>
                  <span>{showRow.description ? showRow.description : "-"}</span>
                </div>
                <div className="mb-4 flex justify-between mx-4">
                  <span className="font-semibold">Status: </span>
                  <span>{showRow.status ? showRow.status : "-"}</span>
                </div>
                <div className="mb-4 flex justify-between mx-4">
                  <span className="font-semibold">Type: </span>
                  <span>{showRow.type}</span>
                </div>
                {showRow.comment && (
                  <div className="mb-4 flex justify-between mx-4">
                    <span className="font-semibold">message: </span>
                    <span>{showRow.comment}</span>
                  </div>
                )}
              </div>
              {!ismodify && !showRow.comment &&(
                <div className="mb-4 flex justify-center mx-4 ">
                  <button
                    className="bg-blue-500 p-2 rounded text-white"
                    onClick={() => setIsmodify(true)}
                  >
                    repondre
                  </button>
                </div>
              )}
              {ismodify && (
                <form
                  className="flex flex-col w-full items-center"
                  onSubmit={(e) => handleSubmitBtn(e,showRow)}
                >
                  <div>
                    <select className="w-64 text-lg font-semibold text-center border-2 mb-4 outline-none">
                      <option value="accepter" defaultValue='true'>
                        accepter
                      </option>
                      <option value="annuler">annuler</option>
                    </select>
                  </div>
                  <div className="w-[70%]  mb-4">
                    <textarea className="w-full border-2 outline-none resize-none"></textarea>
                  </div>
                  <div className="text-md mb-4 text-white flex w-full  justify-center">
                    <button
                      type="submit"
                      className="bg-green-600 mx-12 p-2 rounded-md"
                    >
                      valider
                    </button>
                    <button className="bg-red-600 p-2 rounded-md">
                      annuler
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
