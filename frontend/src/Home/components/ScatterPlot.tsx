import Plot from 'react-plotly.js';
import useDataset from '../../hooks/useDataset';

const ScatterPlot = () => {
  const { dataset } = useDataset('http://localhost:5000/dataset');
  return (
    <div className='w-full lg:w-[80%] flex justify-center self-center'>
      <Plot
        data={[
          {
            x: dataset.map((item) => item[0]),
            y: dataset.map((item) => item[1]),
            mode: 'markers',
            marker: { color: 'blue' },
          },
        ]}
        layout={{
          height: 500,
          title: 'Voici sa représentation graphique',
          xaxis: { title: 'KM', tick0: 0, showline: true },
          yaxis: { title: 'Prix', tick0: 0, showline: true },
        }}
        style={{ width: '100%', height: '100%' }}
        config={{ responsive: true }}
      />
    </div>
  );
};
export default ScatterPlot;
