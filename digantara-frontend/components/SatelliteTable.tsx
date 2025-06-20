"use client";

import { useEffect, useState } from "react";
import { Satellite } from "../types/Satellite";
import { saveSelected } from "../utils/storage";

type Props = {
  selected: Satellite[];
  setSelected: (satellites: Satellite[]) => void;
};

export default function SatelliteTable({ selected, setSelected }: Props) {
  const [data, setData] = useState<Satellite[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSatellites = async () => {
    setLoading(true);
    try {
      // const res = await fetch(
      //   "https://backend.digantara.dev/v1/satellites?attributes=noradCatId,intlDes,name,launchDate,objectType,orbitCode,countryCode"
      // );
      // const data = await res.json();
      // setData(data?.data ?? []);
    } catch (err) {
      setError("Failed to fetch satellite data.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (sat: Satellite) => {
    const exists = selected.find((s) => s.noradCatId === sat.noradCatId);
    if (exists) {
      const updated = selected.filter((s) => s.noradCatId !== sat.noradCatId);
      setSelected(updated);
      saveSelected(updated);
    } else {
      if (selected.length >= 10) {
        alert("Maximum 10 satellites can be selected.");
        return;
      }
      const updated = [...selected, sat];
      setSelected(updated);
      saveSelected(updated);
    }
  };

  useEffect(() => {
    fetchSatellites();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="overflow-auto max-h-[500px] border rounded-md">
      <table className="min-w-full table-auto text-sm">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="p-2 text-left">Select</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">NORAD ID</th>
            <th className="p-2 text-left">Orbit</th>
            <th className="p-2 text-left">Type</th>
            <th className="p-2 text-left">Country</th>
            <th className="p-2 text-left">Launch Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((sat) => (
            <tr
              key={sat.noradCatId}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-2">
                <input
                  type="checkbox"
                  checked={selected.some(
                    (s) => s.noradCatId === sat.noradCatId
                  )}
                  onChange={() => handleSelect(sat)}
                />
              </td>
              <td className="p-2">{sat.name}</td>
              <td className="p-2">{sat.noradCatId}</td>
              <td className="p-2">{sat.orbitCode || "-"}</td>
              <td className="p-2">{sat.objectType || "-"}</td>
              <td className="p-2">{sat.countryCode || "-"}</td>
              <td className="p-2">{sat.launchDate || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
