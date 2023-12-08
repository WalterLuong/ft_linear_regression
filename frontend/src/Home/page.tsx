import axios from 'axios';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import ScatterPlot from './components/ScatterPlot';
import DatasetTable from './components/DatasetTable';
import useModel from '../hooks/useModel';

const Home = () => {
  const [iterations, setIterations] = useState<number>(100);
  const [learning_rate, setLearningRate] = useState<number>(0.05);
  const { data, loading, error } = useModel('http://localhost:5000/model');
  console.log(data);
  useEffect(() => {
    // Appel de la méthode GET pour récupérer la valeur actuelle de x au chargement initial
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/values');
        setIterations(response.data.iterations);
        setLearningRate(response.data.learning_rate);
      } catch (error) {
        console.error('Erreur lors de la récupération de x :', error);
      }
    };

    fetchData();
  }, []);

  const [newValue, setNewValue] = useState<number>(100); // Valeur par défaut de l'input
  const [newValue2, setNewValue2] = useState<number>(0.05); // Valeur par défaut de l'input

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewValue(parseInt(event.target.value, 10));
  };

  const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
    setNewValue2(parseInt(event.target.value, 10));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/modify', {
        iterations: newValue,
        learning_rate: newValue2,
      });
      setIterations(newValue);
      setLearningRate(newValue2);
      console.log('La valeur de x a été modifiée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la modification de x :', error);
    }
  };

  return (
    <div className='lg:px-10 w-full h-max flex flex-col overflow-hidden '>
      <h1 className='my-10 self-center bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 inline-block text-transparent bg-clip-text text-7xl font-bold'>
        FT_LINEAR_REGRESSION
      </h1>
      <p>
        La <span className='font-bold text-red-700'>régression linéaire</span>{' '}
        est une technique d'analyse de données qui prédit la valeur de données
        inconnues en utilisant une autre valeur de données apparentée et connue.
        Il modélise mathématiquement la variable inconnue ou dépendante et la
        variable connue ou indépendante sous forme d'équation linéaire. <br />
        <br />
        Dans ce projet, nous allons utiliser la régression linéaire pour prédire
        le prix d'une voiture en fonction de son kilométrage.
        <br />
        La régression linéaire se décompose en plusieurs parties :
      </p>
      <ul className='self-center my-10'>
        <a href='#dataset' className='text-xl font-bold'>
          • Le dataset
        </a>
        <li className='text-xl font-bold'>• Le modèle</li>
        <li className='text-xl font-bold'>• La fonction de coût</li>
        <li className='text-xl font-bold'>• La descente de gradient</li>
      </ul>
      <p>
        Nous expliquerons chacune des parties en illustrant au maximum tout en
        proposant des explications claires.
      </p>
      <h1
        id='dataset'
        className='font-bold text-3xl my-5 w-full shadow-[inset_0px_-25px_15px_-20px_pink]'>
        Le dataset
      </h1>
      <p>
        Pour commencer un projet de Machine Learning, nous avons forcément
        besoin d'un dataset. Le dataset sont les données que l'on utilisera pour
        entraîner notre modèle.
        <br />
      </p>
      <p className='mb-5'>
        Le dataset représente ici les prix de vente de voitures en fonction de
        leur kilométrage.
        <br />
        Nous avons le tableau suivant :
      </p>
      <DatasetTable />
      <ScatterPlot />
      <div>
        <p className='flex flex-col'>
          Nous voyons que la répartition des données est linéaire. <br />
          Notre modèle sera donc le modèle linéaire suivant : <br />
          <span className=' font-bold self-center'>f(𝑥) = a𝑥 + b</span>
          <br />
          Nous chercherons les valeurs de a et b.
        </p>
        {iterations && <div>{`Nombre d'itérations : ${iterations}`}</div>}
        {learning_rate && <div>{`Learning rate : ${learning_rate}`}</div>}
        <p> Changer les valeurs :</p>
        <form onSubmit={handleSubmit}>
          <label>
            Nouvelle valeur de x :
            <input
              type='number'
              value={newValue.toString()}
              onChange={handleChange}
            />
            <input
              type='number'
              value={newValue2.toString()}
              onChange={handleChange2}
            />
          </label>
          <button type='submit'>Modifier values</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
