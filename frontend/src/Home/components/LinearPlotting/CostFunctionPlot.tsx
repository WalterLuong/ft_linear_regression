import Plot from 'react-plotly.js';

type CostFunctionPlotProps = {
  costFunction: number[];
  iterations: number;
};

const transition = {
  duration: 500,
  easing: 'cubic-in-out',
};

const CostFunctionPlot = (props: CostFunctionPlotProps) => {
  return (
    <Plot
      data={[
        {
          x: props.iterations,
          y: props.costFunction,
          mode: 'lines',
          marker: { color: 'blue' },
          name: 'Fonction coût',
        },
      ]}
      layout={{
        height: 500,
        title: 'Représentation graphique de la fonction coût',
        xaxis: { title: 'Itérations', tick0: 0, showline: true },
        yaxis: { title: 'J(θ)', tick0: 0, showline: true },
        transition: transition,
        plot_bgcolor: 'white',
        paper_bgcolor: '#1F2937',
        font: {
          color: 'white',
        },
      }}
      style={{ width: '100%', height: '100%' }}
      config={{ responsive: true }}
    />
  );
};

export default CostFunctionPlot;
