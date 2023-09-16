import { Box, Button, Stack, TextField } from "@mui/material";
import logo from "./logo.png"

export default function ScanPage() {
  return (
    <Box sx={{ width: "100%", height: "85vh" }} pt={"20%"} display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Stack sx={{ width: "80%", height: "90%" }} direction={"column"} alignItems={"center"} spacing={2}>
        <Box
          component="img"
          alt="The house from the offer."
          src={logo}
          sx={{ aspectRatio: 389 / 74, width: 300 }}
        />
        <Box sx={{ width: "100%", height: "100%", bgcolor: "lightgray", borderRadius: 2 }} />
        <Stack direction={"row"} spacing={2}>
          {/* add something to enter your name here */}
          <Button variant="contained" sx={{ fontWeight: "bold", fontSize: "20px" }} size="large" href="/select">Scan</Button>
        </Stack>
      </Stack>
    </Box>
  )
}