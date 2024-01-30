import DatasetTable from './components/DatasetTable';
import LinearPlotView from './components/LinearPlotting/LinearPlotView';
import ScatterPlot from './components/ScatterPlot';

const Home = () => {
  return (
    <div className='w-full h-max flex flex-col overflow-auto bg-gray-800 text-white'>
      <div className='w-full bg-gray-900 flex flex-col bg-opacity-50 backdrop-blur-sm sticky top-0 left-0'>
        <h1 className='my-10 self-center bg-white hover:bg-gradient-to-r hover:from-red-800 hover:via-red-300 hover:to-red-800 inline-block text-transparent bg-clip-text text-3xl lg:text-5xl font-bold transition-all ease-in-out duration-200'>
          FT_LINEAR_REGRESSION
        </h1>
      </div>
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
        className='font-bold text-3xl my-5 w-full border-b border-white pb-2'
      >
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
      <div className=' my-5 px-5 rounded-lg'>
        <ScatterPlot />
      </div>
      <div>
        <p className='flex flex-col'>
          Nous voyons que la répartition des données est linéaire. <br />
          Notre modèle sera donc le modèle linéaire suivant : <br />
          <span className=' font-bold self-center'>f(𝑥) = a𝑥 + b</span>
          <br />
          Nous chercherons les valeurs de a et b.
        </p>
        <img src='matrice.png' alt='matrice' width={500} height={500} />
        <LinearPlotView />
      </div>
    </div>
  );
};

export default Home;
