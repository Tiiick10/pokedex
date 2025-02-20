import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PokemonPage from "./pages/PokemonPage";
import PokeTeam from "./pages/PokeTeam";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poke-team" element={<PokeTeam />} />
        <Route path="/pokemon/:id" element={<PokemonPage />} />
      </Routes>
    </Router>
  );
}

export default App;
