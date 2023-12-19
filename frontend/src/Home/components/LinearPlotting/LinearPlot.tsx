import Plot from 'react-plotly.js';
import useDataset from '../../../hooks/useDataset';
import useModel from '../../../hooks/useModel';

type LinearPlotProps = {
  iterations: number;
  learningRate: number;
  xPredictions: number[];
  yPredictions: number[];
};

const LinearPlot = (props: LinearPlotProps) => {
  const { dataset } = useDataset('http://localhost:5000/dataset');
  const { data2 } = useModel(
    'http://localhost:5000/model',
    props.iterations,
    props.learningRate
  );

  const transition = {
    duration: 500,
    easing: 'cubic-in-out',
  };

  return (
    <div className='w-full lg:w-[80%] flex justify-center self-center flex-col'>
      <Plot
        data={[
          {
            x: dataset.map((item) => item[0]),
            y: dataset.map((item) => item[1]),
            mode: 'markers',
            marker: { color: 'blue' },
            name: 'Dataset',
          },
          {
            x: dataset.map((item) => item[0]),
            y: data2,
            mode: 'lines',
            marker: { color: 'red' },
            name: 'Model',
          },
          {
            x: props.xPredictions,
            y: props.yPredictions,
            mode: 'markers',
            marker: { color: 'green' },
            name: 'Prediction',
          },
        ]}
        layout={{
          height: 500,
          title: 'Voici sa représentation graphique',
          xaxis: { title: 'KM', tick0: 0, showline: true },
          yaxis: { title: 'Prix', tick0: 0, showline: true },
          useResizeHandler: true,
          transition: transition,
        }}
        style={{ width: '100%', height: '100%' }}
        config={{ responsive: true }}
      />
    </div>
  );
};
export default LinearPlot;
