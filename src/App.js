import { Route, Routes } from "react-router-dom";
import ScanPage from "./ScanPage";
import SelectPage from "./SelectPage";
import SummaryPage from "./Summary";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ScanPage />} />
      <Route path="/select" element={<SelectPage />} />
      <Route path="/summary" element={<SummaryPage />} />
    </Routes>
  );
}

export default App;
