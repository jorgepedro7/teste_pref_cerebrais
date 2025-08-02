import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Assessment from "./pages/Assessment";
import Result from "./pages/Result";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Assessment />} />
        <Route path="/result" element={<Result />} />
        {/* Outras rotas podem ser adicionadas aqui */}
      </Routes>
    </Router>
  );
}
