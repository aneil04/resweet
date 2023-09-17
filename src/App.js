import { Route, Routes } from "react-router-dom";
import ScanPage from "./ScanPage";
import SelectPage from "./SelectPage";
import SummaryPage from "./Summary";
import { useGlobalContext } from "./GlobalContext";
import { Box } from "@mui/material";

function App() {
  return (
    // <Routes>
    //   <Route path="/" element={<ScanPage />} />
    //   <Route path="/select" element={<SelectPage />} />
    //   <Route path="/summary" element={<SummaryPage />} />
    // </Routes>
    <Router />
  );
}

function Router() {
  const { currentPage } = useGlobalContext()

  return (
    <Box>
      {
        currentPage === 0 ? <ScanPage /> :
          currentPage === 1 ? <SelectPage /> :
            <SummaryPage />
      }
    </Box>
  )
}

export default App;
