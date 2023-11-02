import { useEffect, useState } from 'react';

const debounce = (fn: () => void, ms: number) => {
  let timer: NodeJS.Timeout;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this);
    }, ms);
  };
};

interface Props {
  callback?: ((width: number) => void) | null;
}

const UseMediaQuery = ({ callback }: Props) => {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    const debouncedHandleResize = debounce(() => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 100);

    window.addEventListener('resize', debouncedHandleResize);

    if (callback) {
      callback(dimensions.width);
    }

    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, [dimensions.width, callback]);

  return dimensions;
};

export default UseMediaQuery;
