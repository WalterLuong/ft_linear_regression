import { useState } from 'react';
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

  return (
    <div>
      <ParametersForm
        iterations={iterations}
        learningRate={learningRate}
        setIterations={setIterations}
        setLearningRate={setLearningRate}
      />
      <LinearPlot
        iterations={iterations}
        learningRate={learningRate}
        xPredictions={xPredictions}
        yPredictions={yPredictions}
      />
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
    </div>
  );
};
export default LinearPlotView;
