import { Satellite } from "../app/types/Satellite";

export const saveSelected = (items: Satellite[]) => {
  localStorage.setItem("selectedSatellites", JSON.stringify(items));
};

export const getSelected = (): Satellite[] => {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("selectedSatellites");
  return data ? (JSON.parse(data) as Satellite[]) : [];
};
