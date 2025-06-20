import { Satellite } from "../types/Satellite";

const API_BASE = "https://backend.digantara.dev/v1/satellites";

export const fetchSatellites = async (
  objectTypes: string[] = [],
  attributes: string[] = []
): Promise<Satellite[]> => {
  const params = new URLSearchParams();

  if (objectTypes.length) {
    params.set("objectTypes", objectTypes.join(","));
  }

  if (attributes.length) {
    params.set("attributes", attributes.join(","));
  }

  const res = await fetch(`${API_BASE}?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch satellites");

  const data = await res.json();
  return data.data;
};
