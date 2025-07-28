import React from "react";

const DataTable = ({ drugsData = [] }) => {
  return (
    <div className="flex-1 max-h-11/12 overflow-auto m-auto">
      <table>
        <thead className="bg-secondary">
          <tr>
            <th>Id</th>
            <th>Code</th>
            <th>Generic Name</th>
            <th>Company</th>
            <th>Brand Name</th>
            <th>Launch Date</th>
          </tr>
        </thead>
        <tbody>
          {drugsData.length ? (
            drugsData.map((el, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{el.code}</td>
                <td>{el.genericName}</td>
                <td>{el.company}</td>
                <td>{el.brandName}</td>
                <td>{new Date(el.launchDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
