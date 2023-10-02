import { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/dataset")
      .then((response) => response.json())
      .then((data) => setData(data.data));
  }, []);

  console.log(data);

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>
      <table className="flex flex-col gap-2 items-center">
        <thead>
          <tr className="flex gap-10 justify-evenly w-52 border">
            <th>km</th>
            <th>prix</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index} className="flex gap-10 justify-end border">
                <td>{item[0]}</td>
                <td>{item[1]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
