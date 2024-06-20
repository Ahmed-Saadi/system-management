import { useEffect, useState } from "react";
import { Material } from "../../models/model.ts";
import { AddMateriel } from "../../component/admin/addMateriel.tsx";
import { MaterialDetails } from "../../component/admin/materialDetails.tsx";
import DataTable from "../../component/admin/table_admin.tsx";
import api from "../../api/api.ts";

export const Materiel = () => {
  const [data, setData] = useState<Material[]>([]);
  const [selectedRow, setSelectedRow] = useState<Material | null>(null);
  const [addMateriel, setaddMateriel] = useState<boolean | null>(null);
  const [modifyRow, setModify] = useState<Material | null>(null);

  useEffect(() => {
   api
      .get("/get")
      .then((response) => {
        setData([...response.data]);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleAdd = () => {
    setaddMateriel(true);
  };

  function onDelete(index: Material) {
    try {
      api.delete(`/del/${index.m_id}`).then(() => {
        setData([...data.filter((i) => i.m_id !== index.m_id)]);
      });
    } catch (e) {
      console.error("error has occupied : ", e);
    }
  }

  function handlesaveMaterial(status: boolean, one_row?: Material) {
    if (one_row) {
      setData([...data, one_row]);
      setaddMateriel(status);
    } else {
      setaddMateriel(status);
    }
  }

  const handleModifyClick = (item: Material | null) => {
    setModify(item);
  };
  const handleviewClick = (item: Material | null) => {
    setSelectedRow(item);
  };

  return (
    <>
      <div className="flex  items-start bg-first-color  font-color  w-full ">
        <div className="flex items-center flex-col m-8">
          <div className="flex">
            <div className="flex flex-col">
              <div className=" font-bold text-3xl py-8 bg-white  p-8 rounded-3xl  shadow-md w-1/3 self-center">
                <h1>List de Materiel</h1>
              </div>
              <div className="flex justify-end my-4">
                <button
                  className=" rounded-3xl font-bold w-40 h-8 p-1 bg-second-color shadow hover:bg-forth-color flex justify-center items-center"
                  onClick={handleAdd}
                >
                  <img src="../public/icons/add-icon.svg" alt="" />{" "}
                  <p className="m-2 text-lg">New </p>
                </button>
              </div>
              <DataTable
                data={data}
                columns={["m_id", "name", "categorie", "owner", "date"]}
                handleviewClick={handleviewClick}
              />
            </div>
            <div className="p-4 self-center mt-24">
              {selectedRow && (
                <MaterialDetails
                  selectedRow={selectedRow}
                  handleModifyClick={handleModifyClick}
                  onDelete={onDelete}
                  setSelectedRow={setSelectedRow}
                />
              )}
            </div>
          </div>

          {/*show the row */}

          {(addMateriel || modifyRow) && (
            <AddMateriel
              addMaterial={handlesaveMaterial}
              modifyRow={modifyRow}
              setModify={setModify}
              setData={setData}
            />
          )}
        </div>
      </div>
    </>
  );
};

