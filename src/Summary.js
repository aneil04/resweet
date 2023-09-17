import { Box, Button, Stack, TextField } from "@mui/material"
import PaymentInfo from "./PaymentInfo"
import { useGlobalContext, getAmountDue } from "./GlobalContext"
import { useEffect } from "react"
import BackButton from "./BackButton"

export default function SummaryPage() {
	const { people, getAmountDue, sendVenmo } = useGlobalContext()

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
						key={people.name}
						name={person.name}
						link={sendVenmo(person)}
						cost={getAmountDue(person.name)}
					/>
				)
			})}
			<BackButton />
		</Box>
	)
}
