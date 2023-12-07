import { Link } from 'react-router-dom';
import useDataset from '../hooks/useDataset';
import Plot from 'react-plotly.js';

const Home = () => {
  const { data, loading, error } = useDataset('http://localhost:5000/dataset');

  return (
    <div className='lg:px-10 w-full h-max flex flex-col items-center overflow-hidden'>
      <h1 className='bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 inline-block text-transparent bg-clip-text text-7xl font-bold'>
        FT_LINEAR_REGRESSION
      </h1>
      <p>
        La régression linéaire est une technique d'analyse de données qui prédit
        la valeur de données inconnues en utilisant une autre valeur de données
        apparentée et connue. Il modélise mathématiquement la variable inconnue
        ou dépendante et la variable connue ou indépendante sous forme
        d'équation linéaire. <br />
        <br />
        Dans ce projet, nous allons utiliser la régression linéaire pour prédire
        le prix d'une voiture en fonction de son kilométrage.
        <br />
        La régression linéaire se décompose en plusieurs parties :
      </p>
      <ul>
        <li className='text-xl font-bold'>- Le dataset</li>
        <li className='text-xl font-bold'>- Le modèle</li>
        <li className='text-xl font-bold'>- La fonction de coût</li>
        <li className='text-xl font-bold'>- La descente de gradient</li>
      </ul>
      <p>
        Nous expliquerons chacune des parties en illustrant au maximum tout en
        proposant des explications claires.
      </p>
      <h1 id='dataset' className='font-bold text-3xl my-5'>
        Le dataset
      </h1>
      <p>
        Pour commencer un projet de Machine Learning, nous avons forcément
        besoin d'un dataset. Le dataset sont les données que l'on utilisera pour
        entraîner notre modèle.
      </p>
      <p className='mb-5 px-5'>
        Le dataset représente ici les prix de vente de voitures en fonction de
        leur kilométrage.
        <br />
        Nous avons le tableau suivant :
      </p>
      {loading && <div>Loading...</div>}
      {data && (
        <div className='flex flex-col self-center items-center w-52 border-2 justify-center'>
          <div className='flex gap-10 w-full bg-slate-200 justify-center'>
            <p className='flex w-12 justify-center'>KM</p>
            <p className='flex w-12 justify-center'>PRIX</p>
          </div>
          {data.map((item, index) => (
            <div
              key={index}
              className='flex gap-10 border-t-2 w-full justify-center'>
              <div className='flex w-12 justify-center'>{item[0]}</div>
              <div className='flex w-12 justify-center'>{item[1]}</div>
            </div>
          ))}
        </div>
      )}
      {error && <p>{error}</p>}
      <div className='w-full flex justify-center'>
        <Plot
          data={[
            {
              x: data.map((item) => item[0]),
              y: data.map((item) => item[1]),
              mode: 'markers',
              marker: { color: 'blue' },
            },
          ]}
          layout={{
            title: 'Représentation graphique',
            xaxis: { title: 'KM' },
            yaxis: { title: 'Prix' },
            responsive: true,
            useResizeHandler: true,
            autosize: true,
            orientation: 'h',
          }}
          style={{ width: '100%', height: '100%' }}
          config={{ displayModeBar: false }}
        />
      </div>
      <div>
        <p className='flex flex-col'>
          Nous voyons que la répartition des données est linéaire. <br />
          Notre modèle sera donc le modèle linéaire suivant : <br />
          <span className=' font-bold self-center'>f(𝑥) = a𝑥 + b</span>
          <br />
          Nous chercherons les valeurs de a et b.
        </p>
      </div>
    </div>
  );
};

export default Home;
