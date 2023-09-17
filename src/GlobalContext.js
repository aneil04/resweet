import React, { useContext, useState } from "react"

const GlobalContext = React.createContext()

export function useGlobalContext() {
	return useContext(GlobalContext)
}

export function GlobalProvider({ children }) {
	const [currentPage, setCurrentPage] = useState(0)
	const [food, setFood] = useState([
		{
			name: "Pizza",
			cost: 7,
			count: 0,
		},
		{
			name: "Burger",
			cost: 10,
			count: 0,
		},
		{
			name: "Sandwhich",
			cost: 5,
			count: 0,
		},
		{
			name: "Cookie",
			cost: 2,
			count: 0,
		},
		{
			name: "Milkshake",
			cost: 4,
			count: 0,
		},
		{
			name: "Pizza2",
			cost: 7,
			count: 0,
		},
		{
			name: "Burger2",
			cost: 10,
			count: 0,
		},
		{
			name: "Sandwhich2",
			cost: 5,
			count: 0,
		},
		{
			name: "Cookie2",
			cost: 2,
			count: 0,
		},
		{
			name: "Milkshake2",
			cost: 4,
			count: 0,
		},
		{
			name: "Pizza3",
			cost: 7,
			count: 0,
		},
		{
			name: "Burger3",
			cost: 10,
			count: 0,
		},
		{
			name: "Sandwhich3",
			cost: 5,
			count: 0,
		},
		{
			name: "Cookie3",
			cost: 2,
			count: 0,
		},
		{
			name: "Milkshake3",
			cost: 4,
			count: 0,
		},
	])
	const [people, setPeople] = useState([])
	const [currentPerson, setCurrentPerson] = useState("")

	function addPerson(name, venmo) {
		setPeople([
			...people,
			{
				name: name,
				venmo: venmo,
				foodSelected: [],
			},
		])
		setCurrentPerson(name)
	}

	function toggleFood(foodName, value) {
		const foodTemp = food
		const peopleTemp = people

		food.forEach((item) => {
			if (item.name === foodName) {
				item.count += value ? 1 : -1
			}
		})

		people.forEach((person) => {
			if (person.name === currentPerson) {
				if (value) {
					person.foodSelected.push(foodName)
				} else {
					person.foodSelected.filter(
						(foodItem) => foodItem !== foodName
					)
				}
			}
		})

		setFood(foodTemp)
		setPeople(peopleTemp)
	}

	function getAmountDue(name) {
		let price = 0

		people.forEach((person) => {
			if (person.name === name) {
				const foodsSelected = person.foodSelected

				foodsSelected.forEach((selectedFood) => {
					food.forEach((food) => {
						if (food.name === selectedFood) {
							price += food.cost / food.count
						}
					})
				})
			}
		})

		return price.toFixed(2)
	}

	function processData(data) {

	}

  function getPrice(foodName) {
    for (let x = 0; x < food.length; x++) {
      if (food[x].name === foodName) {
        return food[x].cost
      }
    }

    return -1
  }

	function sendVenmo(person) {
		let amount = getAmountDue(person.name)
		let s =
			"https://venmo.com/?txn=charge&audience=public&recipients=" +
			person.venmo +
			"&amount=" +
			amount +
			"&note=ThisisyourbillsplitbyResweet!"
		return s
	}

	const value = {
		food,
		people,
		setPeople,
		currentPerson,
		setCurrentPerson,
		addPerson,
		toggleFood,
		getAmountDue,
		sendVenmo,
		currentPage,
		setCurrentPage,
    getPrice,
		setFood,
	}

	return (
		<GlobalContext.Provider value={value}>
			{children}
		</GlobalContext.Provider>
	)
}
