export type PredictionTableProps = {
  xPredictions: number[];
  yPredictions: number[];
};

const PredictionTable = (props: PredictionTableProps) => {
  return (
    <div className='my-5 flex flex-col self-center'>
      <h1 className='flex self-center font-bold mb-5'>Prédictions</h1>
      <div className='flex border-2 w-52 justify-center'>
        <div className='flex flex-col items-center w-full'>
          <p className='bg-slate-200 font-bold w-full flex justify-center'>
            KM
          </p>
          {props.xPredictions.map((item, index) => (
            <div key={index} className='border-t-2 w-full flex justify-center'>
              {item}
            </div>
          ))}
        </div>
        <div className='flex flex-col items-center w-full'>
          <p className='bg-slate-200 font-bold w-full justify-center flex'>
            PRIX
          </p>
          {props.yPredictions.map((item, index) => (
            <div key={index} className='border-t-2 w-full flex justify-center'>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PredictionTable;
