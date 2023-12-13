import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useParameters(
  url: string,
  iterations: number,
  learningRate: number
) {
  const [iter, setIterations] = useState<number>(0);
  const [learning_rate, setLearningRate] = useState<number>(0);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(url);
        setIterations(response.data.iterations);
        setLearningRate(response.data.learning_rate);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [url, iterations, learningRate]);

  return { iter, learning_rate };
}
