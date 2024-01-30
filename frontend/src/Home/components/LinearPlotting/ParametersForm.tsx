import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import useParameters from '../../../hooks/useParameters';

export type ParametersFormProps = {
  iterations: number;
  learningRate: number;
  setIterations: (iterations: number) => void;
  setLearningRate: (learningRate: number) => void;
};

const ParametersForm = (props: ParametersFormProps) => {
  const [iterationsForm, setIterationsForm] = useState<number>(100);
  const [learningRateForm, setLearningRateForm] = useState<number>(0.05);
  const { iter, learning_rate } = useParameters(
    'http://localhost:5000/parameters',
    props.iterations,
    props.learningRate
  );

  const handleChangeIteration = (event: ChangeEvent<HTMLInputElement>) => {
    setIterationsForm(parseInt(event.target.value, 10));
  };

  const handleChangeLearningRate = (event: ChangeEvent<HTMLInputElement>) => {
    setLearningRateForm(parseFloat(event.target.value));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/modify', {
        iterations: iterationsForm,
        learning_rate: learningRateForm,
      });
      props.setIterations(iterationsForm);
      props.setLearningRate(learningRateForm);
    } catch (error) {
      console.error('Erreur lors de la modification des paramètres:', error);
    }
  };
  return (
    <>
      <p>
        Nous pouvons changer les paramètres d'entraînement si on le souhaite.{' '}
        <br />
        Actuellement, les valeurs des paramètres sont les suivantes : <br />
        <span className='font-bold'>Iterations :</span> {iter} <br />
        <span className='font-bold'>Learning rate :</span> {learning_rate}
      </p>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
        <div className='flex gap-5'>
          <label>Changer les itérations:</label>
          <input
            type='number'
            step='1'
            min='0'
            max='10000'
            value={iterationsForm.toString()}
            onChange={handleChangeIteration}
            className='text-black outline-none px-2 w-32 text-right bg-gray-600 backdrop-blur-xl'
          />
        </div>
        <div className='flex gap-5'>
          <label>Changer le learning rate :</label>
          <input
            type='number'
            step='0.01'
            min='0'
            max='1'
            value={learningRateForm.toString()}
            onChange={handleChangeLearningRate}
            className='bg-blue-400 rounded-full px-2 border-2 border-black ml-2 w-max'
          />
        </div>
        <button
          type='submit'
          className='rounded-lg  bg-green-400 lg:bg-red-400 px-5 border-2 border-black w-max'
        >
          Modifier les paramètres
        </button>
      </form>
    </>
  );
};

export default ParametersForm;
