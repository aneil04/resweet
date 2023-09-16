import { Box, Button, List, ListItem, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useGlobalContext } from "./GlobalContext";

export default function SelectPage() {
  const {food, people, addPerson, toggleFood} = useGlobalContext()

  const [modalOpen, setModalOpen] = useState(false)
  const [modalName, setModalName] = useState(false);
  const [modalVenmo, setModalVenmo] = useState("")

  function handleAddPerson() {
    addPerson(modalName, modalVenmo)
    setModalOpen(false)
  }

  return (
    <Box sx={{ width: "100%" }} pt={"20%"} display={"flex"} alignItems={"center"} justifyContent={"center"} flexDirection={"column"}>
      <Stack direction={"column"} alignItems={"center"} spacing={2}>
        <List sx={{ flexDirection: "row", display: "flex", alignItems: "center", width: window.innerWidth, overflowX: "hidden", overflow: "scroll" }}>
          {people.map((person) => {
            return (
              <ListItem>
                <PersonTile name={person.name} />
              </ListItem>
            )
          })}
          <Button sx={{ width: 75, height: 50, marginRight: 2 }} color="info" variant="contained" onClick={() => setModalOpen(true)}>Add</Button>
        </List>
        {food.map((item) => {
          return <FoodItem name={item.name} cost={item.cost} />
        })}
        <Stack direction={"horizontal"}>
          <Button color="success" variant="contained">Finished</Button>
        </Stack>
      </Stack>
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: 'translate(-50%, -50%)', width: "80%", bgcolor: "white", borderRadius: 2, padding: 2 }} alignItems={"center"} display={"flex"} justifyContent={"center"}>
          <Stack direction={"column"} sx={{ flexGrow: 1 }} spacing={2}>
            <Typography fontSize={25} fontWeight={"bold"}>Add a new person</Typography>
            <TextField onChange={(e) => setModalName(e.target.value)} label="What's your name" />
            <TextField onChange={(e) => setModalVenmo(e.target.value)} label="Enter your venmo" />
            <Stack direction={"horizontal"}>
              <Button sx={{ flexGrow: 1, marginRight: 2, fontSize: 16, fontWeight: "bold" }} color="error" variant="outlined" onClick={() => handleAddPerson()}>Don't have venmo</Button>
              <Button sx={{ flexGrow: 1, fontSize: 16, fontWeight: "bold" }} color="success" variant="contained" onClick={() => handleAddPerson()}>Confirm</Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Box>
  )
}

function FoodItem({ name, cost }) {
  const [selected, setSelected] = useState(false)

  function handleSelect() {
    setSelected(selected => !selected)
  }

  return (
    <Box sx={{
      border: selected ? "3px solid #1976D2" : "1px solid lightgray", borderRadius: 2, marginRight: 10
    }} onClick={() => { handleSelect() }} py={2} px={5} width={230}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography>{name}</Typography>
        <Typography>{cost}</Typography>
      </Stack>
    </Box>
  )
}

function PersonTile({ name }) {
  return (
    <Box sx={{ border: "1px solid lightgray" }} width={75} height={50} display={"flex"} alignItems={"center"} justifyContent={"center"}>
      <Typography>{name}</Typography>
    </Box>
  )
}