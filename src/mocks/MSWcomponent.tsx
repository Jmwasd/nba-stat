import type { ComponentProps } from 'react';
import { createContext, useState, useEffect } from 'react';

const MSWContext = createContext('');

type Props = Omit<ComponentProps<typeof MSWContext.Provider>, 'value'>;

const MSWConfig = ({ children }: Props) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
      import('./index').then(({ initMocks }) => initMocks()).then(() => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, []);

  return <MSWContext.Provider value="">{loaded ? children : null}</MSWContext.Provider>;
};

export default MSWConfig;
