import { Box, Button, Stack, TextField } from "@mui/material"
import PaymentInfo from "./PaymentInfo"
import { useGlobalContext, getAmountDue } from "./GlobalContext"
import { Box, Button } from "@mui/material"

export default function SummaryPage() {
	const { people, getAmountDue } = useGlobalContext()
	return (
		<Box
			sx={{ width: "100%", height: "85vh" }}
			pt={"20%"}
			display={"flex"}
			alignItems={"center"}
			flexDirection={"column"}
		>
			{people.map((person) => {
				return (
					<PaymentInfo
						name={person.name}
						link="https://google.com"
						cost={getAmountDue(person.name)}
					/>
				)
			})}
		</Box>
	)
}
