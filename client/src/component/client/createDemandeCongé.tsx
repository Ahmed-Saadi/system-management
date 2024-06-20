import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useDemandeCongéStore } from "../../store/demad_store";
import { Demand_conger } from "../../models/model";
import api from "../../api/api";

interface Props {
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setFilterData:React.Dispatch<React.SetStateAction<Demand_conger[]>>;
}

export const CreateDemandeCongé: React.FC<Props> = ({ setIsAdd ,setFilterData}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<Demand_conger>({});

  const { addDemande } = useDemandeCongéStore((state: any) => ({
    addDemande: state.addDemande,
  }));

  const [currentDate, setCurrentDate] = useState<string>("");
  const [numberOfDays, setNumberOfDays] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const startDateStr = useWatch({
    control,
    name: "date_debut",
  });
  const endDateStr = useWatch({
    control,
    name: "date_fin",
  });

  useEffect(() => {
    const date = new Date().toISOString().split("T")[0];
    setCurrentDate(date);
  }, []);

  useEffect(() => {
    const calculatedDays = calculateDateDifference(startDateStr, endDateStr);
    setNumberOfDays(calculatedDays);
    setValue("nb_days", calculatedDays);
  }, [startDateStr, endDateStr, setValue]);

  const handleSubmitBtn: SubmitHandler<Demand_conger> = (
    demande: Demand_conger
  ) => {
    if (demande.nb_days <= 0) {
      setErrorMessage("Please choose a valid number of days!");
    } else {
      api.post("/demands/conger/add", demande).then((response) => {
        addDemande(response.data);
        setFilterData((prevState) => [...prevState, response.data]);
        setIsAdd(false);
      });
    }
  };

  function calculateDateDifference(startDateStr: string, endDateStr: string) {
    if (!startDateStr || !endDateStr) return 0;

    const startDate: Date = new Date(startDateStr);
    const endDate: Date = new Date(endDateStr);

    const differenceMs: number = endDate.getTime() - startDate.getTime();
    const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
    return differenceDays > 0 ? differenceDays : 0;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Add a new demande:
          </h2>
          <button
            onClick={() => setIsAdd(false)}
            className="text-gray-600 hover:text-gray-800"
          >
            <img
              src="/icons/double-arrow-icon.svg"
              alt="Close"
              className="w-6 h-6"
            />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleSubmitBtn)}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold">
              Name:
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Please enter the name!" })}
              className="w-full mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <p className="text-sm text-red-500 mt-1">{message}</p>
              )}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-semibold">
              Type:
            </label>
            <select
              id="type"
              {...register("type", { required: "Please select the type!" })}
              className="w-full mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select type de demande</option>
              <option value="holiday">Holiday</option>
              <option value="quelque">Quelque</option>
              <option value="autre">Autre</option>
            </select>
            <ErrorMessage
              errors={errors}
              name="type"
              render={({ message }) => (
                <p className="text-sm text-red-500 mt-1">{message}</p>
              )}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date_debut" className="block text-sm font-semibold">
              Date début:
            </label>
            <input
              type="date"
              id="date_debut"
              min={currentDate}
              {...register("date_debut", {
                required: "Please select start date!",
              })}
              className="w-full mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              errors={errors}
              name="date_debut"
              render={({ message }) => (
                <p className="text-sm text-red-500 mt-1">{message}</p>
              )}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="date_fin" className="block text-sm font-semibold">
              Date fin:
            </label>
            <input
              type="date"
              id="date_fin"
              min={currentDate}
              {...register("date_fin", {
                required: "Please select end date!",
              })}
              className="w-full mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <ErrorMessage
              errors={errors}
              name="date_fin"
              render={({ message }) => (
                <p className="text-sm text-red-500 mt-1">{message}</p>
              )}
            />
          </div>

          {numberOfDays > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-semibold">Nombre de jour:</label>
              <p className="bg-gray-100 mt-1 p-2 rounded-md">{numberOfDays}</p>
            </div>
          )}

          {errorMessage && (
            <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
          )}

          <div className="mb-4">
            <label htmlFor="cause" className="block text-sm font-semibold">
              Raison (optional):
            </label>
            <textarea
              id="cause"
              placeholder="Je veux prendre le congé pour ...."
              className="w-full mt-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 resize-none"
              {...register("cause")}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Valider
          </button>
        </form>
      </div>
    </div>
  );
};
