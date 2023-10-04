import ApiResponseType from '@/types/api';
import axios from 'axios';

const fetcher = async <T>(url: string): Promise<T[] | null> => {
  const fetchData = await axios.get<ApiResponseType<T>>(url).then((res) => res.data);

  if (fetchData.response.length === 0) {
    return null;
  }

  return fetchData.response;
};

export default fetcher;
