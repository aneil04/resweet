import { Box, Button, Stack, Typography } from "@mui/material"
import { useGlobalContext } from "./GlobalContext"
import BackButton from "./BackButton"

export default function SummaryPage() {
  const { people } = useGlobalContext()

  return (
    <Box
      sx={{ width: "100%", height: "85vh" }}
      pt={"15%"}
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
    >
      <Box borderBottom={"1px solid gray"} width={"100%"} justifyContent={"center"} marginBottom={2} display={"flex"}>
        <Typography fontSize={48} fontWeight={"bold"}>Summary</Typography>
      </Box>
      {people.map((person) => {
        return <PersonCard person={person} />
      })}
      <Box justifySelf={"flex-start"} width={"100%"}>
        <BackButton />
      </Box>
    </Box>
  )
}

function PersonCard({ person }) {
  const { getAmountDue, sendVenmo, getPrice ,getSharedPrice} = useGlobalContext()

  return (
    <Box sx={{ border: "2px solid lightgray", width: "80%", padding: 2, marginBottom: 2, borderRadius: 2 }}>
      <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} sx={{ paddingBottom: 1.5, borderBottom: "2px solid lightgray" }}>
        <Typography fontWeight={"bold"} fontSize={22}>{person.name}</Typography>
        <Button variant="contained" onClick={() => window.open(sendVenmo(person.name))}>Request ${getAmountDue(person.name)}</Button>
      </Stack>
      <Stack direction={"column"} width={"100%"} marginTop={1} spacing={1} >
        {person.foodSelected.map((food) => {
          const price = getSharedPrice(food).toFixed(2)
          return (
            <Box flexDirection={"row"} display={"flex"} justifyContent={"space-between"}>
              <Typography fontSize={18}>{`${food}`}</Typography>
              <Box width={"100%"} height={17} marginX={1} borderBottom={"2px dashed lightgray"}></Box>
              <Typography fontSize={18}>${price}</Typography>
            </Box>)
        })}
      </Stack>
    </Box>
  )
}