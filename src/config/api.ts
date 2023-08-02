import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api-nba-v1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_ENV_API_KEY,
    "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
  },
});
