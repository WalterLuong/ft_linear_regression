import { useEffect, useState } from 'react';
import axios from 'axios';

const useThetaHistory = (
  url: string,
  iterations: number,
  learning_rate: number
) => {
  const [thetaHistory0, setThetaHistory0] = useState<number[]>([]);
  const [thetaHistory1, setThetaHistory1] = useState<number[]>([]);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(url);
        setThetaHistory0(response.data.theta0);
        setThetaHistory1(response.data.theta1);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [url, iterations, learning_rate]);

  return { thetaHistory0, thetaHistory1 };
};

export default useThetaHistory;
