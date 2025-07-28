import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/vitest";
import App from "./App";

global.fetch = vi.fn();

const mockCompanies = {
  data: [
    "Merck Sharp & Dohme Corp.",
    "Jafra cosmetics International",
    "Jubilant HollisterStier LLC",
    "REMEDYREPACK INC.",
  ],
};

const mockAllDrugsData = {
  data: [
    {
      code: "0006-0568",
      genericName: "vorinostat",
      company: "Merck Sharp & Dohme Corp.",
      brandName: "ZOLINZA",
      launchDate: "2004-02-14T23:01:10Z",
    },
    {
      code: "68828-192",
      genericName: "Avobenzone, Octinoxate, Octisalate, Octocrylene",
      company: "Jafra cosmetics International",
      brandName:
        "CC Cream Complexion Corrector Medium Dark Broad Spectrum SPF 15",
      launchDate: "2011-02-02T08:57:26Z",
    },
    {
      code: "65044-6516",
      genericName: "Insects (whole body), Fire Ant Mix",
      company: "Jubilant HollisterStier LLC",
      brandName: "Insects (whole body), Fire Ant Mix",
      launchDate: "2004-04-10T05:10:51Z",
    },
    {
      code: "52125-617",
      genericName: "Valacyclovir hydrochloride",
      company: "REMEDYREPACK INC.",
      brandName: "Valacyclovir hydrochloride",
      launchDate: "2024-04-07T01:22:52Z",
    },
  ],
};

const mockREMEDYREPACKData = {
  data: [
    {
      code: "52125-617",
      genericName: "Valacyclovir hydrochloride",
      company: "REMEDYREPACK INC.",
      brandName: "Valacyclovir hydrochloride",
      launchDate: "2024-04-07T01:22:52Z",
    },
  ],
};

describe("data table filter test for company selection", () => {
  beforeEach(() => {
    fetch.mockImplementation((url) => {
      if (url.includes("/distinct-companies")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockCompanies),
        });
      }

      if (url.includes("company=REMEDYREPACK")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockREMEDYREPACKData),
        });
      }

      if (url.includes("/drug-data?order=descending")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockAllDrugsData),
        });
      }
    });
  });

  afterEach(() => {
    fetch.mockClear();
  });

  it("started testing", async () => {
    render(<App />);
    expect(screen.getByText("Drugs Data - Itransition")).toBeInTheDocument();

    expect(await screen.findByText("ZOLINZA")).toBeInTheDocument();
    expect(screen.getAllByText("Valacyclovir hydrochloride"));

    await userEvent.selectOptions(
      screen.getByRole("combobox"),
      screen.getByRole("option", { name: "REMEDYREPACK INC." })
    );

    expect(await screen.findAllByText("Valacyclovir hydrochloride"));
    expect(screen.queryByText("ZOLINZA")).not.toBeInTheDocument();
  });
});
