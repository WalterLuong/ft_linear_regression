import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useDataset(url: string) {
  const [dataset, setDataset] = useState<String[]>([]);
  const [error, setError] = useState<String>('');
  const [loading, setLoading] = useState<Boolean>(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setDataset(response.data.data);
      } catch (err) {
        setError('Erreur lors de la requête');
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { dataset, error, loading };
}
