interface ApiResponseType<T> {
  get: string;
  parameters: { [key: string]: string };
  response: Array<T>;
  results: number;
}

export default ApiResponseType;
