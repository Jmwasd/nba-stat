import { response, context, ResponseTransformer } from 'msw';

const res = (...transformers: ResponseTransformer[]) =>
  response(...transformers, context.status(200), context.delay(1000));

export default res;
