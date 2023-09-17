import { Button, Stack, Typography } from "@mui/material"

export default function PaymentInfo({ name, link, cost }) {
	return (
		<Stack direction="row" spacing={2}>
			<Typography>{name}</Typography>
			<Button variant="contained" onClick={() => openNewTab(link)}>
				pay {name} {cost}
			</Button>
		</Stack>
	)
}

function openNewTab(link) {
	window.open(link)
}
