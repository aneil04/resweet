import { Route, Routes } from "react-router-dom";
import ScanPage from "./ScanPage";
import SelectPage from "./SelectPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ScanPage />} />
      <Route path="/select" element={<SelectPage />} />
    </Routes>
  );
}

export default App;
