import { Route, Routes } from "react-router-dom";
import ScanPage from "./ScanPage";
import SelectPage from "./SelectPage";
import { GlobalProvider } from "./GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <Routes>
        <Route path="/" element={<ScanPage />} />
        <Route path="/select" element={<SelectPage />} />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
