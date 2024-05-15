import { useEffect, useState } from "react";
import { Row } from "../models/model.ts";
import axios from "axios";
import { AddMateriel } from "../component/addMateriel.tsx";
import { MaterialDetails } from "../component/materialDetails.tsx";

export const Materiel = () => {
  const [data, setData] = useState<Row[]>([]);
  const [selectedRow, setSelectedRow] = useState<Row | null>(null);
  const [addMateriel, setaddMateriel] = useState<boolean | null>(null);
  const [modifyRow, setModify] = useState<Row | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/get")
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

  function onDelete(index: Row) {
    try {
      
      axios.delete(`http://localhost:8081/api/del/${index.m_id}`).then(() => {
        setData([...data.filter((i) => i.m_id !== index.m_id)]);
      });
    } catch (e) {
      console.error("error has occupied : ", e);
    }
  }

  function handlesaveMaterial(status: boolean, one_row?: Row) {
    if (one_row) {
      setData([...data, one_row]);
      setaddMateriel(status);
    } else {
      setaddMateriel(status);
    }
  }

  const handleModifyClick = (item: Row) => {
    setModify(item);
  };
  const handleviewClick = (item: Row) => {
    setSelectedRow(item);
  };

  return (
    <>
      <div className="flex  flex-grow  items-start bg-first-color  font-color ">
        <div className="flex items-center flex-grow flex-col m-8">
          <div className=" font-bold text-4xl py-8 bg-white  p-8 rounded-3xl  shadow-md">
            <h1>List de Materiel</h1>
          </div>
          <div className="flex-grow"></div>

          <div className="flex flex-col">
            <div className="flex justify-end my-4" >
              <button
                className=" rounded-3xl font-bold w-40 h-8 p-1 bg-second-color shadow hover:bg-forth-color"
                onClick={handleAdd}
              >
                Add Material
              </button>
            </div>
            <table className="rounded-xl border-none bg-white shadow-md">
              <thead>
                <tr className=" bg-my-blue text-xl border-2">
                  <th className="h-14 w-60">Name</th>
                  <th className="h-14 w-60">Categorie</th>
                  <th className="h-14 w-80">owner</th>
                  <th className="h-14 w-80">
                    date d'ajoute
                  </th>
                  <th className="h-14 w-40 ">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.m_id} className="  text-center font-color justify-center border-2 font-semibold shadow-md ">
                    <td >
                      {item.name}
                    </td>
                    <td >
                      {item.categorie}
                    </td>
                    {
                      item.owner ? (<td >
                      {item.owner?.username} {item.owner?.user_family_name} {item.owner?.profession}
                    </td>): (<td></td>)
                    }
                    <td >
                      {item.date}
                    </td>
                    <td  className="flex">
                    
                      <button
                        className="material-Row-Btn hover:bg-forth-color"
                        onClick={() => handleviewClick(item)}
                      >
                       <img src="./public/icons/view-icon.svg" />
                      </button>
                      <button
                        className=" material-Row-Btn hover:bg-forth-color"
                        onClick={() => handleModifyClick(item)}
                      >
                       <img src="./public/icons/edit-icon.svg" />
                      </button>
                      <button
                        className="material-Row-Btn hover:bg-forth-color"
                        onClick={() => onDelete(item)}
                      >
                       <img src="./public/icons/delete-icon.svg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/*show the row */}

          {selectedRow && (
            <MaterialDetails
              setSelectedRow={setSelectedRow}
              selectedRow={selectedRow}
            />
          )}

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
