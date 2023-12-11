import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useValues(url: string) {
  const [iterations, setIterations] = useState<number>(0);
  const [learning_rate, setLearningRate] = useState<number>(0);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(url);
        setIterations(response.data.iterations);
        setLearningRate(response.data.learning_rate);
      } catch (err) {
        setError('Erreur lors de la requête');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { iterations, learning_rate, error2, loading2 };
}
