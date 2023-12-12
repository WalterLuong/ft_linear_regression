import Plot from 'react-plotly.js';
import useDataset from '../../hooks/useDataset';
import useModel from '../../hooks/useModel';
import { ChangeEvent, useState } from 'react';
import axios from 'axios';

type LinearPlotProps = {
  iterations: number;
  learning_rate: number;
};

const LinearPlot = (props: LinearPlotProps) => {
  const [iterations, setIterations] = useState<number>(props.iterations);
  const [learning_rate, setLearningRate] = useState<number>(
    props.learning_rate
  );
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
    <div className='w-full lg:w-[80%] flex justify-center self-center flex-col'>
      <Plot
        data={[
          {
            x: data.map((item) => item[0]),
            y: data.map((item) => item[1]),
            mode: 'markers',
            marker: { color: 'blue' },
            name: 'Dataset',
          },
          {
            x: data.map((item) => item[0]),
            y: data2,
            mode: 'lines',
            marker: { color: 'red' },
            name: 'Model',
          },
          {
            x: x_pred,
            y: y_pred,
            mode: 'markers',
            marker: { color: 'green' },
            name: 'Prediction',
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
      <form onSubmit={handleSubmit}>
        <p>Choisis un prix bg :</p>
        <input type='number' value={xform.toString()} onChange={handleChange} />
      </form>
      <div className='my-5 flex flex-col self-center'>
        <h1 className='flex self-center font-bold mb-5'>Prédictions</h1>
        <div className='flex border-2 w-52 justify-center'>
          <div className='flex flex-col items-center w-full'>
            <p className='bg-slate-200 font-bold w-full flex justify-center'>
              KM
            </p>
            {x_pred.map((item, index) => (
              <div
                key={index}
                className='border-t-2 w-full flex justify-center'>
                {item}
              </div>
            ))}
          </div>
          <div className='flex flex-col items-center w-full'>
            <p className='bg-slate-200 font-bold w-full justify-center flex'>
              PRIX
            </p>
            {y_pred.map((item, index) => (
              <div
                key={index}
                className='border-t-2 w-full flex justify-center'>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LinearPlot;
