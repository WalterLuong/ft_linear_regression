import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-screen flex sticky h-24 bg-blue-400 justify-around items-center border-b-2 border-black">
      <h1 className="text-5xl font-bold text-white">FT_LINEAR_REGRESSION</h1>
      <Link to="/" className="text-5xl font-bold text-white">
        Démo
      </Link>
      <Link to="/cours" className="text-5xl font-bold text-white">
        Cours
      </Link>
    </div>
  );
};

export default Navbar;
