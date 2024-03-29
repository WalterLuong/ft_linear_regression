import { useState } from 'react';
import useCostFunction from '../../../hooks/useCostFunction';
import useThetaHistory from '../../../hooks/useThetaHistory';
import CostFunctionPlot from './CostFunctionPlot';
import LinearPlot from './LinearPlot';
import ParametersForm from './ParametersForm';
import PredictionForm from './PredictionForm';
import PredictionTable from './PredictionTable';

const LinearPlotView = () => {
  const [xSubmit, setXSubmit] = useState<number>(0);
  const [xPredictions, setXPredictions] = useState<number[]>([]);
  const [yPredictions, setYPredictions] = useState<number[]>([]);
  const [iterations, setIterations] = useState<number>(0); // Valeur par défaut de l'input
  const [learningRate, setLearningRate] = useState<number>(0); // Valeur par défaut de l'input

  const { costFunction } = useCostFunction(
    'http://localhost:5000/costfunction',
    iterations,
    learningRate
  );

  const { thetaHistory0, thetaHistory1 } = useThetaHistory(
    'http://localhost:5000/thetahistory',
    iterations,
    learningRate
  );

  console.log('thetaHistory0', thetaHistory0);
  console.log('thetaHistory1', thetaHistory1);

  return (
    <div className='flex flex-col'>
      <div className=''>
        <ParametersForm
          iterations={iterations}
          learningRate={learningRate}
          setIterations={setIterations}
          setLearningRate={setLearningRate}
        />
      </div>
      <div className='lg:px-5'>
        <LinearPlot
          iterations={iterations}
          learningRate={learningRate}
          xPredictions={xPredictions}
          yPredictions={yPredictions}
        />
      </div>
      <PredictionForm
        xSubmit={xSubmit}
        xPredictions={xPredictions}
        yPredictions={yPredictions}
        setXPredictions={setXPredictions}
        setYPredictions={setYPredictions}
        setXSubmit={setXSubmit}
      />
      <PredictionTable
        xPredictions={xPredictions}
        yPredictions={yPredictions}
      />
      <div className='lg:px-5'>
        <CostFunctionPlot costFunction={costFunction} iterations={iterations} />
        {/* <GradientDescentPlot
        theta0={thetaHistory0}
        theta1={thetaHistory1}
        costfunction={costFunction}
      /> */}
      </div>
    </div>
  );
};
export default LinearPlotView;
