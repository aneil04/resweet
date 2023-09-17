import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos"
import { Button } from "@mui/material"
import { useGlobalContext } from "./GlobalContext"

export default function BackButton() {
	const { setCurrentPage, currentPage } = useGlobalContext()

	return (
		<Button
			variant="contained"
      sx={{ fontSize: 18 }}
			startIcon={<ArrowBackIosIcon />}
			onClick={() => {
				setCurrentPage(currentPage - 1)
			}}
		>
			Back
		</Button>
	)
}
