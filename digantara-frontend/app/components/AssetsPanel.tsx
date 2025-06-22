"use client";

import { useEffect, useMemo, useState } from "react";
import { Satellite } from "../types/Satellite";
import FilterPanel from "./FilterPanel";
import SatelliteList from "./SatelliteTable";
import SelectedPanel from "./SelectedPanel";

export default function AssetsPanel() {
  const [searchValue, setSearchValue] = useState("");
  const [objectTypeFilter, setObjectTypeFilter] = useState<string[]>([]);
  const [orbitCodeFilter, setOrbitCodeFilter] = useState<string[]>([]);
  const [selected, setSelected] = useState<Satellite[]>([]);
  const [allSatellites, setAllSatellites] = useState<Satellite[]>([]);
  const [filteredSatellites, setFilteredSatellites] = useState<Satellite[]>([]);

  const filtersApplied = useMemo(() => {
    return (
      searchValue.trim() !== "" ||
      objectTypeFilter.length > 0 ||
      orbitCodeFilter.length > 0
    );
  }, [searchValue, objectTypeFilter, orbitCodeFilter]);

  const applyFilters = () => {
    let filtered = allSatellites;

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
      const normalize = (str: string) =>
        str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();

      const normalizedFilter = orbitCodeFilter.map((code) =>
        normalize(code ?? "")
      );

      filtered = filtered.filter((s) =>
        normalizedFilter.includes(normalize(s.orbitCode ?? ""))
      );
    }

    setFilteredSatellites(filtered);
  };

  const handleClearFilters = () => {
    setSearchValue("");
    setObjectTypeFilter([]);
    setOrbitCodeFilter([]);
    setFilteredSatellites([]);
  };

  const objectTypeCounts = useMemo(() => {
    const source = allSatellites;

    return source.reduce(
      (acc, sat) => {
        const type = sat.objectType?.toUpperCase() ?? "UNKNOWN";

        if (type === "PAYLOAD") acc.payloads += 1;
        else if (type === "DEBRIS") acc.debris += 1;
        else if (type === "ROCKET BODY") acc.rocketBodies += 1;
        else acc.unknown += 1;

        return acc;
      },
      {
        payloads: 0,
        debris: 0,
        rocketBodies: 0,
        unknown: 0,
      }
    );
  }, [allSatellites]);

  useEffect(() => {
    const fetchSatellites = async () => {
      try {
        const res = await fetch(
          "https://backend.digantara.dev/v1/satellites?attributes=noradCatId,intlDes,name,launchDate,objectType,orbitCode,countryCode"
        );
        const result = await res.json();
        setAllSatellites(result?.data ?? []);
      } catch (err) {
        console.error("Failed to fetch satellites", err);
      }
    };

    fetchSatellites();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "selectedSatellites",
      JSON.stringify(selected.map((s) => s.noradCatId))
    );
  }, [selected]);

  useEffect(() => {
    const saved = localStorage.getItem("selectedSatellites");
    if (saved) {
      try {
        const savedIds = JSON.parse(saved);
        const savedSats = allSatellites.filter((s) =>
          savedIds.includes(s.noradCatId)
        );
        setSelected(savedSats);
      } catch {}
    }
  }, [allSatellites]);

  return (
    <div className="flex py-4">
      <div className="space-y-4 w-[70%]">
        <FilterPanel
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          objectTypeFilter={objectTypeFilter}
          setObjectTypeFilter={setObjectTypeFilter}
          orbitCodeFilter={orbitCodeFilter}
          setOrbitCodeFilter={setOrbitCodeFilter}
          onApplyFilters={applyFilters}
          onClearFilters={handleClearFilters}
          filteredCount={allSatellites?.length}
          filtersApplied={filtersApplied}
          objectTypeCounts={objectTypeCounts}
        />

        <SatelliteList
          data={
            filteredSatellites.length > 0 || filtersApplied
              ? filteredSatellites
              : allSatellites
          }
          selected={selected}
          setSelected={setSelected}
        />
      </div>

      <hr className="border border-[#3b4147] h-[80vh] mx-8" />

      <SelectedPanel selected={selected} />
    </div>
  );
}
