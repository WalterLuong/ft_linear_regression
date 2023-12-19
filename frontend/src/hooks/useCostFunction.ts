import { useEffect, useState } from 'react';
import axios from 'axios';

const useCostFunction = (
  url: string,
  iterations: number,
  learning_rate: number
) => {
  const [costFunction, setCostFunction] = useState<number[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(url);
        setCostFunction(response.data.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [url, iterations, learning_rate]);

  return { costFunction };
};

export default useCostFunction;
