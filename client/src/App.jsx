import React from "react";
import { useCallback, useEffect, useState } from "react";
import Footer from "./components/layout/footer";
import Header from "./components/layout/header";
import DataFilter from "./components/ui/data-filter";
import DataTable from "./components/ui/data-table";
import { API, ORDER } from "./constants";

function App() {
  const [drugsData, setDrugsData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [dataOrder, setDataOrder] = useState(ORDER.DESCENDING);

  const fetchCompanies = useCallback(async () => {
    try {
      const response = await fetch(API.GET_COMPANIES);
      const data = await response.json();

      setCompanies(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchDrugsData = useCallback(async () => {
    try {
      const response = await fetch(
        API.GET_DRUGS_DATA(dataOrder, selectedCompany)
      );
      const data = await response.json();

      setDrugsData(data.data);
    } catch (error) {
      console.error(error);
    }
  }, [selectedCompany, dataOrder]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  useEffect(() => {
    fetchDrugsData();
  }, [selectedCompany, dataOrder]);

  return (
    <div className="flex flex-col gap-4 h-screen">
      <Header />
      <main className="flex-1 overflow-auto flex flex-col gap-8">
        <div className="flex items-center justify-center gap-4">
          <DataFilter
            companies={companies}
            setSelectedCompany={setSelectedCompany}
          />
          <div className="flex flex-col gap-4">
            <div className="font-medium">Order</div>
            <button
              onClick={() =>
                setDataOrder((prev) =>
                  prev === ORDER.ASCENDING ? ORDER.DESCENDING : ORDER.ASCENDING
                )
              }
            >
              {dataOrder.toUpperCase()}
            </button>
          </div>
        </div>

        <DataTable drugsData={drugsData} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
