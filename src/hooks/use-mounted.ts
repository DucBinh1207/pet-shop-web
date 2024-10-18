import { useEffect, useRef } from "react";

const useMounted = () => {
  const ref = useRef(false);
  const get = () => ref.current;

  useEffect(() => {
    ref.current = true;
  }, []);

  return get;
};

export default useMounted;
