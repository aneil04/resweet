import {
	Box,
	Button,
	List,
	ListItem,
	Modal,
	Stack,
	TextField,
	Typography,
} from "@mui/material"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import { useEffect, useState } from "react"
import { useGlobalContext } from "./GlobalContext"
import logo from "./logo.png"
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import BackButton from "./BackButton"

export default function SelectPage() {
	const { food, people, addPerson, setCurrentPage } = useGlobalContext()
	const [modalOpen, setModalOpen] = useState(false)
	const [modalName, setModalName] = useState(false)
	const [modalVenmo, setModalVenmo] = useState("")

	function handleAddPerson() {
		addPerson(modalName, modalVenmo)
		setModalOpen(false)
	}

	return (
		<Box
			sx={{ width: "100%" }}
			pt={"10%"}
			display={"flex"}
			alignItems={"center"}
			justifyContent={"center"}
			flexDirection={"column"}
		>
			<Stack
				direction={"column"}
				alignItems={"center"}
				spacing={2}
				sx={{ paddingBottom: 15 }}
			>
				<Typography variant={"h3"} fontWeight={"bold"}>
					Select Food
				</Typography>
				<List
					sx={{
						flexDirection: "row",
						display: "flex",
						alignItems: "center",
						width: window.innerWidth - people.length * 2 - 20,
						overflowX: "hidden",
						overflow: "scroll",
						borderBottom: "2px solid lightgray",
						borderTop: "2px solid lightgray",
						paddingY: 1.5,
					}}
				>
					{people.length > 0 ? (
						people.map((person) => {
							return (
								<ListItem
									key={person.name}
									sx={{ margin: 0, padding: 0 }}
								>
									<PersonTile name={person.name} />
								</ListItem>
							)
						})
					) : (
						<Box
							sx={{
								paddingY: 2,
								paddingX: 5,
								borderRadius: 2,
								border: "2px solid #facc15",
								backgroundColor: "#fefce8",
								margin: "auto",
							}}
						>
							<Typography sx={{ color: "#A16207" }}>
								No people have been added!
							</Typography>
						</Box>
					)}
				</List>
				{food.map((item) => {
					return (
						<FoodItem
							key={item.name}
							foodName={item.name}
							cost={item.cost}
							data={item}
						/>
					)
				})}
				<Stack direction={"row"} spacing={2} width={"95%"}>
					<BackButton />
					<Button
						size="large"
						color="info"
						variant="contained"
						onClick={() => setModalOpen(true)}
						sx={{ fontSize: 18 }}
					>
						Add
					</Button>
					<Button
						endIcon={<ArrowForwardIosIcon />}
						size="large"
						color="success"
						variant="contained"
						onClick={() => {
							// navigate("/summary")
							setCurrentPage(2)
						}}
						sx={{ fontSize: 18 }}
					>
						Finished
					</Button>
				</Stack>
			</Stack>
			<Modal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box
					sx={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
						width: "80%",
						bgcolor: "white",
						borderRadius: 2,
						padding: 2,
					}}
					alignItems={"center"}
					display={"flex"}
					justifyContent={"center"}
				>
					<Stack
						direction={"column"}
						sx={{ flexGrow: 1 }}
						spacing={2}
					>
						<Typography fontSize={25} fontWeight={"bold"}>
							Add a New Person
						</Typography>
						<TextField
							onChange={(e) => setModalName(e.target.value)}
							label="What's your name"
						/>
						<TextField
							onChange={(e) => setModalVenmo(e.target.value)}
							label="Enter your venmo"
						/>
						<Stack direction={"horizontal"}>
							<Button
								size="large"
								sx={{
									flexGrow: 1,
									fontSize: 16,
									fontWeight: "bold",
								}}
								color="success"
								variant="contained"
								onClick={() => handleAddPerson()}
							>
								Confirm
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Modal>
		</Box>
	)
}

function FoodItem({ data }) {
	const { toggleFood, people, currentPerson } = useGlobalContext()
	const [selected, setSelected] = useState(false)

	useEffect(() => {
		setSelected(false)
		people.forEach((person) => {
			if (person.name === currentPerson) {
				person.foodSelected.forEach((food) => {
					if (food === data.name) {
						setSelected(true)
					}
				})
			}
		})
	}, [currentPerson])

	function handleSelect() {
		if (currentPerson === "") {
			return
		}

		toggleFood(data.name, !selected)
		setSelected((selected) => !selected)
	}

	return (
		<Box
			sx={{
				border: selected ? "3px solid #1976D2" : "1px solid lightgray",
				borderRadius: 2,
			}}
			flexDirection="row"
			display={"flex"}
			onClick={() => {
				handleSelect()
			}}
			py={2}
			px={3}
			width={"80%"}
			justifyContent={"space-between"}
			alignItems={"center"}
		>
			<Typography width="50%">{data.name}</Typography>
			<Typography>${data.cost}</Typography>
			<Stack direction={"row"} spacing={1}>
				<PeopleAltIcon />
				<Typography>{data.count}</Typography>
			</Stack>
		</Box>
	)
}

function PersonTile({ name }) {
	const { currentPerson, setCurrentPerson } = useGlobalContext()

	return (
		<Box
			onClick={() => {
				setCurrentPerson(name)
			}}
			sx={{
				border:
					name === currentPerson
						? "3px solid #1976D2"
						: "1px solid lightgray",
				marginLeft: 1,
				marginRight: 1,
				borderRadius: 2,
			}}
			width={100}
			height={50}
			display={"flex"}
			alignItems={"center"}
			justifyContent={"center"}
		>
			<Typography>{name}</Typography>
		</Box>
	)
}
