import Plot from 'react-plotly.js';

type GradientDescentPlotProps = {
  theta0: number[];
  theta1: number[];
  costfunction: number[];
};

const transition = {
  duration: 500,
  easing: 'cubic-in-out',
};

const GradientDescentPlot = (props: GradientDescentPlotProps) => {
  return (
    <Plot
      data={[
        {
          x: props.theta0,
          y: props.theta1,
          z: props.costfunction,
          type: 'mesh3d',
        },
      ]}
      layout={{
        title: 'Représentation graphique de la fonction coût',
        xaxis: { title: 'Itérations', tick0: 0, showline: true },
        yaxis: { title: 'J(θ)', tick0: 0, showline: true },
        autosize: true,
        transition: transition,
      }}
      style={{ width: '100%', height: '100%' }}
      config={{ responsive: true }}
    />
  );
};

export default GradientDescentPlot;
