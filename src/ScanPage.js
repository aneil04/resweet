import { Box, Button, Stack } from "@mui/material";
import logo from "./logo.png"
import Webcam from "react-webcam";
import axios from "axios";
import React, { useState, useRef, useCallback } from "react";
import { useGlobalContext } from "./GlobalContext";

export default function ScanPage() {
  const { setCurrentPage } = useGlobalContext()
  const webcamref = useRef(0);
  
  function handleScan() {
    let image=webcamref.current.getScreenshot()
    let data = new FormData()
    data.append('document', image)

    axios.post('https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token bb6cc3a8c520ffd40af2b6dc47826786`
      }
    }).then((response) => {
      console.log(response.data.document.inference.prediction.line_items)
      setCurrentPage(1)
    })
  }

  return (
    <Box sx={{ width: "100%", height: "85vh" }} pt={"20%"} display={"flex"} alignItems={"center"} flexDirection={"column"}>
      <Stack sx={{ width: "80%", height: "90%" }} direction={"column"} alignItems={"center"} spacing={2}>
        <Webcam screenshotFormat="image/jpeg" ref={webcamref}  />
        <Box
          component="img"
          alt="The house from the offer."
          src={logo}
          sx={{ aspectRatio: 389 / 74, width: 300 }}
        />
        <Box sx={{ width: "100%", height: "100%", bgcolor: "lightgray", borderRadius: 2 }} />
        <Stack direction={"row"} spacing={2}>
          <Button onClick={() => handleScan()} variant="contained" sx={{ fontWeight: "bold", fontSize: "20px" }} size="large" >Scan</Button>
        </Stack>
      </Stack>
    </Box>
  )
}