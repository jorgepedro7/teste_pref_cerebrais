import { BrowserRouter as Router, Routes, Route } from "react-router";
import HomePage from "@/react-app/pages/Home";
import Assessment from "@/react-app/pages/Assessment";
import Result from "@/react-app/pages/Result";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/result/:id" element={<Result />} />
      </Routes>
    </Router>
  );
}
