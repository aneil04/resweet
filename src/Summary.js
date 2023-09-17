import { Box, Button } from "@mui/material";
import { useGlobalContext } from "./GlobalContext";

export default function SummaryPage() {
  const { people } = useGlobalContext()

  return (
    <Box sx={{ width: "100%", height: "85vh" }} pt={"20%"} display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Button variant="contained">Pay for all</Button>
    </Box>
  )
}