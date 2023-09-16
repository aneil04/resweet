import { Button, Stack, Typography } from "@mui/material"

export default function PaymentInfo({ name, link, cost }) {
	return (
		<Stack direction="row" spacing={2}>
			<Typography>{name}</Typography>
			<Button variant="contained" href={link}>
				pay {name} {cost}
			</Button>
		</Stack>
	)
}
