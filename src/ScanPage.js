import { Box, Button, Stack } from "@mui/material";
import logo from "./logo.png"
import Webcam from "react-webcam";

export default function ScanPage() {
  function handleScan() {
    alert("scan")
  }

  return (
    <Box sx={{ width: "100%", height: "85vh" }} pt={"20%"} display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Stack sx={{ width: "80%", height: "90%" }} direction={"column"} alignItems={"center"} spacing={2}>
        <Webcam />
        <Box
          component="img"
          alt="The house from the offer."
          src={logo}
          sx={{ aspectRatio: 389 / 74, width: 300 }}
        />
        <Box sx={{ width: "100%", height: "100%", bgcolor: "lightgray", borderRadius: 2 }} />
        <Stack direction={"row"} spacing={2}>
          <Button onClick={() => handleScan()} variant="contained" sx={{ fontWeight: "bold", fontSize: "20px" }} size="large" href="/select">Scan</Button>
        </Stack>
      </Stack>
    </Box>
  )
}