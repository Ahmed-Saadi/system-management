import React, { useState, useEffect } from "react";
import { Account, Material, Material_Demand } from "../../models/model";

interface DataTableProps {
  data: (Material | Account | Material_Demand)[];
  columns: string[];
  handleviewClick: (item: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  handleviewClick,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowPerPage] = useState<number>(5);
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const [visibleRows, setVisibleRows] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [previousOne, setPreviousOne] = useState<number | null>(null);

  useEffect(() => {
    setVisibleRows({});
    setPreviousOne(null);
  }, [data]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const toggleVisibility = (index: number, row?: any) => {
    if (previousOne !== null) {
      setVisibleRows((prevState) => ({
        ...prevState,
        [previousOne]: !prevState[previousOne],
      }));
      setPreviousOne(null);
    }

    setVisibleRows((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));

    if (!visibleRows[index]) {
      handleviewClick(row);
      setPreviousOne(index);
    } else {
      handleviewClick(null);
      setVisibleRows((prevState) => ({
        ...prevState,
        [index]: !prevState[index],
      }));
    }
  };

  const startRow = (currentPage - 1) * rowsPerPage;
  const paginatedData = data.slice(startRow, startRow + rowsPerPage);

  return (
    <div className="p-4 h-full">
      <table className="min-w-full border-collapse block overflow-y-auto  overflow-x-hidden  ">
        <thead className=" sticky inset-y-0 text-md">
          <tr className="border flex ">
            {columns.map((column) => {
              if (
                column === "email" ||
                column === "owner" ||
                column === "date"
              ) {
                return (
                  <th key={column} className="bg-gray-200 py-2 text-left w-52">
                    {column}
                  </th>
                );
              } else {
                return (
                  <th
                    key={column}
                    className="bg-gray-200 py-2 text-left table-size "
                  >
                    {column}
                  </th>
                );
              }
            })}
            <th className="bg-gray-200 py-2 text-center w-28">visibility</th>
          </tr>
        </thead>
        <tbody className="text-md">
          {paginatedData.map((row, rowIndex) => {
            const globalIndex = startRow + rowIndex;
            return (
              <tr key={rowIndex} className="border flex ">
                {columns.map((column) => {
                  column = column.toLowerCase();
                  if (column === "owner") {
                    return (
                      <td
                        key={column}
                        className="px-1  py-2 flex justify-evenly w-52 truncate"
                      >
                        <p>{(row as Material).owner?.username}</p>
                        <p>{(row as Material).owner?.family_name}</p>
                        <p>{(row as Material).owner?.profession}</p>
                      </td>
                    );
                  } else if (column === "email" || column === "date") {
                    return (
                      <td key={column} className="  py-2 w-52 px-2  truncate ">
                        {row[column as keyof typeof row]}
                      </td>
                    );
                  } else {
                    return (
                      <td key={column} className="px-1  py-2 table-size  truncate">
                        {row[column as keyof typeof row]}
                      </td>
                    );
                  }
                })}
                <td className="p-2 text-center w-28">
                  <button onClick={() => toggleVisibility(globalIndex, row)}>
                    {visibleRows[globalIndex] ? (
                      <img
                        src="/icons/visibility-off-icon.svg"
                        alt="Not Visible"
                      />
                    ) : (
                      <img src="/icons/visibility-on-icon.svg" alt="Visible" />
                    )}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {data.length > 5 && (
        <div className="flex justify-end my-4 ">
          <select onChange={(e) => setRowPerPage(parseInt(e.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
          <button
            className="px-3 py-1 border rounded mx-1"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`px-3 py-1 border rounded mx-1 ${
                page === currentPage ? "bg-gray-300" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button
            className="px-3 py-1 border rounded mx-1"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default DataTable;
