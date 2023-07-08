import axios from "axios";

export const instance = axios.create({
  baseURL: "https://api-nba-v1.p.rapidapi.com",
  headers: {
    "X-RapidAPI-Key": "83585d71c7mshe9aadef63097536p1e94f6jsn9d6fd2ee9f3a",
    "X-RapidAPI-Host": "api-nba-v1.p.rapidapi.com",
  },
});
