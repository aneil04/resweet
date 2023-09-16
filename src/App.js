import { Route, Routes } from "react-router-dom";
import ScanPage from "./ScanPage";
import SelectPage from "./SelectPage";
import { GlobalProvider } from "./GlobalContext";
import SummaryPage from "./Summary";

function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<ScanPage />} />
        <Route path="/select" element={<SelectPage />} />
        <Route path="/summary" element={<SummaryPage />} />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
