interface ApiResponseType<T> {
  get: string;
  parameters: { [key: string]: string };
  response: T;
  results: number;
}

export default ApiResponseType;
