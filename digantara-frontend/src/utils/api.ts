import axios from "axios";

export const fetchSatellites = async (
  objectTypes: string[],
  attributes: string[]
) => {
  const params = new URLSearchParams();
  if (objectTypes.length) params.append("objectTypes", objectTypes.join(","));
  if (attributes.length) params.append("attributes", attributes.join(","));

  const res = await axios.get(
    `https://backend.digantara.dev/v1/satellites?${params}`
  );
  return res.data.data;
};
