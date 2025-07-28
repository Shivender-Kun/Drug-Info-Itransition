import React from "react";

const DataFilter = ({ companies = [], setSelectedCompany }) => {
  const handleSelectCompany = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSelectedCompany(value);
  };

  return (
    <div className="grid place-content-center">
      <label htmlFor="company" className="flex flex-col gap-4">
        <div className="font-medium">Filter by company</div>
        <select
          name="company"
          id="company"
          className=" border-1 rounded p-1"
          onChange={handleSelectCompany}
          defaultValue=""
        >
          <option value="">None</option>
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default DataFilter;
