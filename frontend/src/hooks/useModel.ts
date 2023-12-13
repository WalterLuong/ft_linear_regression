import { useEffect, useState } from 'react';
import axios from 'axios';

const useModel = (url: string, iterations: number, learning_rate: number) => {
  const [data2, setData2] = useState<number[]>([]);
  const [theta, setTheta] = useState<number[]>([]);
  const [error, setError] = useState<String>('');
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData2(response.data.data);
        setTheta(response.data.theta);
      } catch (err) {
        setError('Erreur lors de la requête');
      } finally {
        setLoading(false);
      }
    })();
  }, [url, iterations, learning_rate]);

  return { data2, theta, error, loading };
};

export default useModel;
