import type { NextApiRequest, NextApiResponse } from 'next';
import instance from './config/api';

const getRemainURL = (url: string | undefined) => url?.replace('/api', '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const baseURL = `${process.env.NEXT_PUBLIC_ENV_API_URL}${getRemainURL(req.url)}`;

  const response = await instance.get(baseURL);

  res.status(200).json(response.data);
}
