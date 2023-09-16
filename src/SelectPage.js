import { Box, Button, List, ListItem, Stack, Typography } from "@mui/material";
import { useState } from "react";

export default function SelectPage() {
  const [food, setFood] = useState([
    {
      name: "Pizza",
      cost: 7
    },
    {
      name: "Burger",
      cost: 14
    },
    {
      name: "Sandwich",
      cost: 9
    },
    {
      name: "Cooke",
      cost: 12
    },
  ])

  const [people, setPeople] = useState([
    {
      name: "Farooq",
      venmo: "venmo-farooq"
    },
    {
      name: "Neil",
      venmo: "venmo-neil"
    },
    {
      name: "Steven",
      venmo: "venmo-steven"
    },
    {
      name: "Bowen",
      venmo: "venmo-bowen"
    },
  ])

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
          <Button sx={{ width: 75, height: 50, marginRight: 2 }} color="info" variant="contained">Add</Button>
        </List>
        {food.map((item) => {
          return <FoodItem name={item.name} cost={item.cost} />
        })}
        <Stack direction={"horizontal"}>
          <Button color="success" variant="contained">Finished</Button>
        </Stack>
      </Stack>
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