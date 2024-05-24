import React from "react";

export const Demande = () => {
  const data = [
    { name: "ahmed", username: "saadi" },
    { name: "ahmed", username: "saadi" },
    { name: "ahmed", username: "saadi" },
    { name: "ahmed", username: "saadi" },
    { name: "ahmed", username: "saadi" },
    { name: "ahmed", username: "saadi" },
    { name: "ahmed", username: "saadi" },
    { name: "ahmed", username: "saadi" },
    { name: "ahmed", username: "saadi" },
    { name: "ahmed", username: "saadi" },
    { name: "ahmed", username: "saadi" },
    { name: "ahmed", username: "saadi" },
    { name: "ahmed", username: "saadi" },
    
  ];
  return (
    <>
      <div className="flex flex-col items-center w-full bg-first-color p-8">
        <div className="font-bold text-4xl py-8 bg-white  p-8 rounded-3xl  shadow-md ">
          <h1>Demandes</h1>
        </div>
        <div
          className="bg-white w-full flex-1 m-12 rounded-3xl shadow-slate-500 shadow-lg grid grid-cols-5 gap-4"
          style={{ height: "calc(100vh / 3)", padding: "20px" }}
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-green-200 rounded-3xl m-3 flex flex-col justify-center items-center shadow-forth-color shadow-lg font-color font-semibold hover:-translate-y-2"
            >
              <h2>{item.name}</h2>
              <h3>Object :{item.username}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
