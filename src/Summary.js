import { Box, Button } from "@mui/material";

export default function SummaryPage() {
  return (
    <Box sx={{ width: "100%", height: "85vh" }} pt={"20%"} display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Button variant="contained">Pay for all</Button>
    </Box>
  )
}