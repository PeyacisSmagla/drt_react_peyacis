"use client";

import { useMemo, useState } from "react";
import { Satellite } from "../types/Satellite";
import { GoDotFill } from "react-icons/go";
import { SiCircleci } from "react-icons/si";
import { BsRocketFill } from "react-icons/bs";
import { TbTriangleFilled } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { LuFilter } from "react-icons/lu";
import { IoMdCloseCircle } from "react-icons/io";
import CustomSelect from "./CustomSelect";
import SatelliteTable from "./SatelliteTable";

const orbitCodes = [
  "LEO",
  "LEO1",
  "LEO2",
  "LEO3",
  "LEO4",
  "MEO",
  "GEO",
  "HEO",
  "IGO",
  "EGO",
  "NSO",
  "GTO",
  "GHO",
  "HAO",
  "MGO",
  "LMO",
  "UFO",
  "ESO",
  "UNKNOWN",
];

const objectTypes = ["PAYLOAD", "ROCKET BODY", "DEBRIS", "UNKNOWN"];

export default function AssetsPanel() {
  const [searchValue, setSearchValue] = useState("");
  const [objectTypeFilter, setObjectTypeFilter] = useState<string[]>([]);
  const [orbitCodeFilter, setOrbitCodeFilter] = useState<string[]>([]);
  const [filteredSatellites, setFilteredSatellites] = useState<Satellite[]>([]);
  const [selected, setSelected] = useState<Satellite[]>([]);

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSearchEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      applyFilters();
    }
  };

  const handleClear = () => {
    setSearchValue("");
    setObjectTypeFilter([]);
    setOrbitCodeFilter([]);
    setFilteredSatellites([]);
  };

  const applyFilters = () => {
    const dummyData: Satellite[] = [];
    let filtered = dummyData;

    if (searchValue.trim()) {
      const value = searchValue.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.name?.toLowerCase().includes(value) ||
          s.noradCatId.toLowerCase().includes(value)
      );
    }

    if (objectTypeFilter.length > 0) {
      filtered = filtered.filter((s) =>
        objectTypeFilter.includes(s.objectType ?? "")
      );
    }

    if (orbitCodeFilter.length > 0) {
      filtered = filtered.filter((s) =>
        orbitCodeFilter.includes(s.orbitCode ?? "")
      );
    }

    setFilteredSatellites(filtered);
  };

  const filtersApplied = useMemo(() => {
    return (
      searchValue.trim() !== "" ||
      objectTypeFilter.length > 0 ||
      orbitCodeFilter.length > 0
    );
  }, [searchValue, objectTypeFilter, orbitCodeFilter]);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create My Asset List</h1>

      <div className="bg-[#1f1f1f] flex items-center flex-wrap justify-between px-3 py-2 rounded-2xl gap-2 text-xs">
        <p className="border border-[#01c4fe] rounded-2xl px-2 py-[0.15rem]">
          All Objects (1000)
        </p>
        <p className="flex items-center gap-1">
          <GoDotFill size={18} color="#01c4fe" /> Payloads (1000)
        </p>
        <p className="flex items-center gap-1">
          <SiCircleci size={11} style={{ transform: "rotate(200deg)" }} />{" "}
          Debris (1000)
        </p>
        <p className="flex items-center gap-1">
          <BsRocketFill size={11} /> Rocket Bodies (2167)
        </p>
        <p className="flex items-center gap-1">
          <TbTriangleFilled size={11} style={{ transform: "rotate(30deg)" }} />{" "}
          Unknown (557)
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center bg-[#1f1f1f] px-3 py-1 rounded-2xl w-full sm:w-[260px]">
          <input
            value={searchValue}
            onChange={handleSearchInput}
            onKeyDown={handleSearchEnter}
            placeholder="Search by name/NORAD ID"
            className="flex-1 bg-transparent text-white text-xs placeholder:text-gray-400 outline-none pr-2"
          />
          <IoClose
            className="text-gray-400 cursor-pointer"
            onClick={handleClear}
          />
          <FiSearch
            size={18}
            className="text-white bg-black p-[0.2rem] rounded-full ml-1"
          />
        </div>

        <CustomSelect
          options={objectTypes}
          selected={objectTypeFilter}
          onChange={setObjectTypeFilter}
          placeholder="Object Type"
        />

        <CustomSelect
          options={orbitCodes}
          selected={orbitCodeFilter}
          onChange={setOrbitCodeFilter}
          placeholder="Orbit Code"
        />

        <button
          onClick={applyFilters}
          className="bg-[#01c4fe] text-black text-xs px-4 py-1 rounded-xl font-semibold"
        >
          Apply Filters
        </button>

        {filtersApplied ? (
          <div className="relative">
            <LuFilter
              size={27}
              className="bg-[#1f1f1f] p-[0.35rem] rounded-2xl cursor-pointer"
              onClick={handleClear}
              title="Clear filters"
            />
            <IoMdCloseCircle className="absolute top-[.8rem] left-[.7rem] text-xs text-red-600" />
          </div>
        ) : (
          <LuFilter
            size={27}
            className="bg-[#1f1f1f] p-[0.4rem] rounded-full"
            title="No filters applied"
          />
        )}
      </div>

      <SatelliteTable
        selected={selected}
        setSelected={setSelected}
        // data={filteredSatellites}
      />
    </div>
  );
}
