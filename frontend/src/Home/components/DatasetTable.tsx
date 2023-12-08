import useDataset from '../../hooks/useDataset';

const DatasetTable = () => {
  const { data, loading, error } = useDataset('http://localhost:5000/dataset');
  return (
    <>
      {loading && <div>Loading...</div>}
      {data && (
        <div className='flex flex-col self-center items-center w-52 border-2 justify-center'>
          <div className='flex gap-10 w-full bg-slate-200 justify-center'>
            <p className='flex w-12 justify-center font-bold'>KM</p>
            <p className='flex w-12 justify-center font-bold'>PRIX</p>
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
    </>
  );
};
export default DatasetTable;
