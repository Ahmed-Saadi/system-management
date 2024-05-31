import React, { useState, useEffect } from "react";
import { Demand_congéer, Material_Demand } from "../../models/model";

interface DataTableProps {
  data: (Material_Demand | Demand_congéer)[];
  columns: string[];
  handleviewClick: (arg0: any) => void;
}

const DataTableClient: React.FC<DataTableProps> = ({
  data,
  columns,
  handleviewClick,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
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
    <div className="p-4">
      <table className="min-w-full border-collapse block overflow-y-auto max-h-[600px] overflow-x-hidden">
        <thead className=" sticky top-0 text-lg">
          <tr className="border flex bg-gray-200">
            {columns.map((column) => (
              <th key={column} className=" p-2 text-left h-12 w-36 ">
                {column}
              </th>
            ))}
            <th className="  p-2 text-left h-12 w-24 ">Visibility</th>
          </tr>
        </thead>
        <tbody >
          {paginatedData.map((row, rowIndex) => {
            const globalIndex = startRow + rowIndex;
            return (
              <tr key={rowIndex} className="border flex bg-white">
                {columns.map((column) => (
                  <td key={column} className="p-2 truncate   h-12 w-36  ">
                    {row[column.toLowerCase() as keyof typeof row]}
                  </td>
                ))}
                <td className="p-2  text-center w-24">
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
        <div className="flex justify-end my-4">
          <select onChange={(e) => setRowsPerPage(parseInt(e.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
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

export default DataTableClient;
