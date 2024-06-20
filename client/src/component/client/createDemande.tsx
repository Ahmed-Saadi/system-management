import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { Material, Material_Demand } from "../../models/model";
import { ErrorMessage } from "@hookform/error-message";
import { useDemandeStore } from "../../store/demad_store";
import api from "../../api/api";

interface Props {
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterData: React.Dispatch<React.SetStateAction<Material_Demand[]>>;
}

export const CreateDemande: React.FC<Props> = ({ setIsAdd, setFilterData }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Material_Demand>({});

  const [ownerMaterials, setOwnerMaterials] = useState<Material[]>([]);
  const [isListVisible, setIsListVisible] = useState(true);
  const [selectedName, setSelectedName] = useState("");

  const { addDemande } = useDemandeStore((state: any) => ({
    addDemande: state.addDemande,
  }));

  const typeValue = useWatch({
    control,
    name: "type",
  });

  useEffect(() => {
    fetchOwnerMaterials();
  }, [typeValue]);

  const fetchOwnerMaterials = () => {
    api.get("/getownerMAterials").then((response) => 
     setOwnerMaterials(response.data)
      
    );
  };

  const handleSubmitBtn: SubmitHandler<Material_Demand> = (demande) => {
    api.post("/demandsMaterial/add", demande).then((response) => {
      addDemande(response.data);
      setFilterData((prevState) => [...prevState, response.data]);
    });
    setIsAdd(false);
  };

  const handleItemClick = (name?: string) => {
    setSelectedName(name ? name : "");
    setValue("name", name ? name : "");
    setIsListVisible(!isListVisible);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white w-full md:w-[700px] mx-4 my-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center bg-blue-500 text-white py-4 px-6 rounded-t-lg">
          <h2 className="text-xl font-semibold">Add a New Demand</h2>
          <button
            onClick={() => setIsAdd(false)}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <img src="/icons/close-icon.svg" alt="Close" className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit(handleSubmitBtn)}>
            <div className="mb-4">
              <label htmlFor="type" className="block font-semibold mb-2">
                Type de demande:
              </label>
              <select
                id="type"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                {...register("type", {
                  required: "Please select the type",
                })}
              >
                <option value="">Select a type</option>
                <option value="reparation">Reparation</option>
                <option value="nouveau">Nouveau</option>
              </select>
              <ErrorMessage
                errors={errors}
                name="type"
                render={({ message }) => (
                  <p className="text-red-500 mt-1">{message}</p>
                )}
              />
            </div>

            {typeValue === "reparation" && (
              <div className="mb-4">
                <label className="block font-semibold mb-2">Material Name:</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    readOnly={!isListVisible}
                    onClick={() => setIsListVisible(!isListVisible)}
                    value={selectedName}
                    {...register("name", { required: "Enter the material name" })}
                  />
                  {isListVisible && (
                    <ul className="absolute left-0 right-0 mt-1 bg-white border rounded-lg shadow-sm z-10">
                      {ownerMaterials.map((material) => (
                        <li
                          key={material.m_id}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleItemClick(material.name)}
                        >
                          {material.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <p className="text-red-500 mt-1">{message}</p>
                  )}
                />
              </div>
            )}

            {typeValue === "nouveau" && (
              <div className="mb-4">
                <label className="block font-semibold mb-2">Name:</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                  {...register("name", { required: "Enter the material name" })}
                />
                <ErrorMessage
                  errors={errors}
                  name="name"
                  render={({ message }) => (
                    <p className="text-red-500 mt-1">{message}</p>
                  )}
                />
              </div>
            )}

            <div className="mb-4">
              <label className="block font-semibold mb-2">Category:</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                {...register("categorie", { required: "Enter the category" })}
              />
              <ErrorMessage
                errors={errors}
                name="categorie"
                render={({ message }) => (
                  <p className="text-red-500 mt-1">{message}</p>
                )}
              />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Description:</label>
              <textarea
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                {...register("description", { required: "Add a description" })}
              />
              <ErrorMessage
                errors={errors}
                name="description"
                render={({ message }) => (
                  <p className="text-red-500 mt-1">{message}</p>
                )}
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="mr-4 px-4 py-2 text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none"
                onClick={() => setIsAdd(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
