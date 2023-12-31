import { Box, Button, Stack } from "@mui/material"
import logo from "./logo.png"
import Webcam from "react-webcam"
import axios from "axios"
import React, { useState, useRef, useCallback, useEffect } from "react"
import { useGlobalContext } from "./GlobalContext"

export default function ScanPage() {
	const { setCurrentPage, setFood, setPeople } = useGlobalContext()
	const webcamref = useRef(0)
	const videoConstraints = {
		facingMode: "environment",
		width: 300,
		height: 480,
	}

	useEffect(() => {
		setPeople([])
		setFood([])
	}, [])

	function handleScan() {
		let image = webcamref.current.getScreenshot()
		let data = new FormData()
		data.append("document", image)

		axios
			.post(
				"https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict",
				data,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Token bb6cc3a8c520ffd40af2b6dc47826786`,
					},
				}
			)
			.then((response) => {
				let cost_data =
					response.data.document.inference.prediction.line_items
				let total_net =
					response.data.document.inference.prediction.total_net.value
				let total_tax =
					response.data.document.inference.prediction.total_tax.value
				let tax_percent = total_tax / total_net
				let food_arr = []
				let name_set = []
				cost_data.map((item) => {
					let temp = item.description
					let x = 2
					while (name_set.includes(temp)) {
						temp = item.description + "" + x
						x = x + 1
					}
					name_set.push(temp)
					let food = {
						name: temp,
						cost: (item.total_amount * (1 + tax_percent)).toFixed(
							2
						),
						count: 0,
					}
					food_arr.push(food)
				})
				setFood(food_arr)
				setCurrentPage(1)
			})
	}

	return (
		<Box 
			sx={{ width: "100%", height: "85vh" }}
			pt={"20%"}
			display={"flex"}
			alignItems={"center"}
			flexDirection={"column"}
		>
			<Stack
				sx={{ width: "80%", height: "90%" }}
				direction={"column"}
				alignItems={"center"}
				spacing={2}
			>
				<Box
					component="img"
					alt="The house from the offer."
					src={logo}
					sx={{ aspectRatio: 389 / 74, width: 300 }}
				/>
				<Box>
					<Webcam
						screenshotFormat="image/jpeg"
						ref={webcamref}
						videoConstraints={videoConstraints}
						style={{ borderRadius: 5 }}
					/>
				</Box>

				<Stack direction={"row"} spacing={2}>
					<Button
						onClick={() => handleScan()}
						variant="contained"
						sx={{ fontWeight: "bold", fontSize: "20px" }}
						size="large"
					>
						Scan
					</Button>
				</Stack>
			</Stack>
		</Box>
	)
}
