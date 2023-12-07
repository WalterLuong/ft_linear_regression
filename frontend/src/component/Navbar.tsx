import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" w-full flex sticky h-24 bg-blue-400 justify-around items-center overflow-hidden">
      <h1 className="text-3xl font-bold text-white">FT_LINEAR_REGRESSION</h1>
      <Link to="/" className="text-2xl font-bold text-white">
        Démo
      </Link>
      <Link to="/cours" className="text-2xl font-bold text-white">
        Cours
      </Link>
    </div>
  );
};

export default Navbar;
