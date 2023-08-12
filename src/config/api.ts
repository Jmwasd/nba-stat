import ApiResponseType from "@/types/api";
import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api-nba-v1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_ENV_API_KEY,
    "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
  },
});

export const fetcher = async <T>(url: string): Promise<T[] | null> => {
  const res = await instance
    .get<ApiResponseType<T>>(url)
    .then((res) => res.data);

  if (res.response.length === 0) {
    return null;
  }

  return res.response;
};
