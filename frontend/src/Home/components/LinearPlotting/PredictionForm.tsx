import axios from 'axios';
import { ChangeEvent, useState } from 'react';

export type PredictionFormProps = {
  xSubmit: number;
  xPredictions: number[];
  yPredictions: number[];
  setXSubmit: (xSubmit: number) => void;
  setXPredictions: (xPredictions: number[]) => void;
  setYPredictions: (yPredictions: number[]) => void;
};

const PredictionForm = (props: PredictionFormProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.setXSubmit(parseInt(event.target.value, 10));
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/predict', {
        x: props.xSubmit,
      });
      console.log('la reponse est', response.data.data);
      props.setXSubmit(props.xSubmit);
      props.setXPredictions([...props.xPredictions, props.xSubmit]);
      props.setYPredictions([
        ...props.yPredictions,
        response.data.data > 0 ? response.data.data : 0,
      ]);
    } catch (error) {
      console.error('Erreur de requête pour la prédiction :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <p>Combien de kilomètres a la voiture :</p>
      <input
        type='number'
        value={props.xSubmit.toString()}
        onChange={handleChange}
      />
      <button
        type='submit'
        className='w-max border-black border-2 rounded-full px-5 bg-yellow-400'>
        Prédire
      </button>
    </form>
  );
};

export default PredictionForm;
