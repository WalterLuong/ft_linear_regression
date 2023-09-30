import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./Home/page";
import Theory from "./Theory/page";
import Navbar from "./component/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cours" element={<Theory />} />
      </Routes>
    </Router>
  );
}

export default App;
