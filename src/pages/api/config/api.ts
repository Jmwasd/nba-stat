import axios from 'axios';

const instance = axios.create({
  headers: {
    'X-RapidAPI-Key': process.env.NEXT_PUBLIC_ENV_API_KEY,
    'X-RapidAPI-Host': 'api-nba-v1.p.rapidapi.com',
  },
});

export default instance;
