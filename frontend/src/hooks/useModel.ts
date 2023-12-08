import { useEffect, useState } from 'react';
import axios from 'axios';

const useModel = (url: string) => {
  const [data, setData] = useState<String>();
  const [error, setError] = useState<String>('');
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data.data);
      } catch (err) {
        setError('Erreur lors de la requête');
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { data, error, loading };
};

export default useModel;
