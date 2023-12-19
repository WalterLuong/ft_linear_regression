import useDataset from '../../hooks/useDataset';

const DatasetTable = () => {
  const { dataset, loading, error } = useDataset(
    'http://localhost:5000/dataset'
  );
  return (
    <>
      {loading && <div>Loading...</div>}
      {dataset && (
        <div className='flex flex-col self-center items-center w-52 border-2 justify-center'>
          <div className='flex w-full bg-slate-200 justify-center'>
            <p className='flex w-full justify-center font-bold'>KM</p>
            <p className='flex w-full justify-center font-bold'>PRIX</p>
          </div>
          {dataset.map((item, index) => (
            <div key={index} className='flex border-t-2 w-full justify-center'>
              <div className='flex w-full justify-center border-r-2'>
                {item[0]}
              </div>
              <div className='flex w-full justify-center'>{item[1]}</div>
            </div>
          ))}
        </div>
      )}
      {error && <p>{error}</p>}
    </>
  );
};
export default DatasetTable;
