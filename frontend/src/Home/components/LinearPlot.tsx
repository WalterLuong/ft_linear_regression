import Plot from 'react-plotly.js';
import useDataset from '../../hooks/useDataset';
import useModel from '../../hooks/useModel';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';

const LinearPlot = () => {
  const { data } = useDataset('http://localhost:5000/dataset');
  const { data2 } = useModel('http://localhost:5000/model');
  const [xform, setXform] = useState<number>(0);
  const [x_pred, setX] = useState<number[]>([]);
  const [y_pred, setY] = useState<number[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setXform(parseInt(event.target.value, 10));
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        x: xform,
      });
      console.log('la reponse est', response.data.data);
      setXform(xform);
      setX([...x_pred, xform]);
      setY([...y_pred, response.data.data]);
      console.log(y_pred);
    } catch (error) {
      console.error('Erreur lors de la modification de x :', error);
    }
  };

  return (
    <div className='w-full lg:w-[80%] flex justify-center self-center'>
      <form onSubmit={handleSubmit}>
        <p>Choisis un prix bg :</p>
        <input type='number' value={xform.toString()} onChange={handleChange} />
      </form>
      <Plot
        data={[
          {
            x: data.map((item) => item[0]),
            y: data.map((item) => item[1]),
            mode: 'markers',
            marker: { color: 'blue' },
          },
          {
            x: data.map((item) => item[0]),
            y: data2,
            mode: 'lines',
            marker: { color: 'red' },
          },
          {
            x: x_pred,
            y: y_pred,
            mode: 'markers',
            marker: { color: 'green' },
          },
        ]}
        layout={{
          title: 'Voici sa représentation graphique',
          xaxis: { title: 'KM', tick0: 0, showline: true },
          yaxis: { title: 'Prix', tick0: 0, showline: true },
          responsive: true,
          useResizeHandler: true,
          autosize: true,
          orientation: 'h',
          color: 'red',
        }}
        style={{ width: '100%', height: '100%' }}
        // config={{ displayModeBar: false }}
      />
    </div>
  );
};
export default LinearPlot;
