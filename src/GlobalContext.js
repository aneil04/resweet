import React, { useContext, useState } from "react"

const GlobalContext = React.createContext()

export function useGlobalContext() {
	return useContext(GlobalContext)
}

export function GlobalProvider({ children }) {
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
	])
	const [people, setPeople] = useState([])
	// const [people, setPeople] = useState([
	//   {
	//     name: "Farooq",
	//     venmo: "venmo-farooq",
	//     foodSelected: ["Pizza", "Cookie", "Milkshake"]
	//   },
	//   {
	//     name: "Bowen",
	//     venmo: "venmo-bowen",
	//     foodSelected: ["Pizza", "Sandwhich", "Cookie", "Milkshake"]
	//   },
	//   {
	//     name: "Neil",
	//     venmo: "venmo-farooq",
	//     foodSelected: ["Pizza", "Cookie", "Milkshake"]
	//   },
	//   {
	//     name: "Steven",
	//     venmo: "venmo-steven",
	//     foodSelected: ["Cookie", "Milkshake"]
	//   }
	// ])
	const [currentPerson, setCurrentPerson] = useState("")

	function addPerson(name, venmo) {
		if (people.length === 0) {
			setCurrentPerson(name)
		}

		setPeople([
			...people,
			{
				name: name,
				venmo: venmo,
				foodSelected: [],
			},
		])
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

		return price
	}

	function sendVenmo(person) {
		let amount = getAmountDue(person.name)
		let s =
			"https://venmo.com/?txn=charge&audience=public&recipients=" +
			person.venmo +
			"&amount=" +
			amount +
			"&note=ThisisyourbillsplitbyResweet!"
	}

	function saveState() {
		window.localStorage.setItem("food", JSON.stringify(food))
		window.localStorage.setItem("people", JSON.stringify(people))
	}

	function parseState() {
		setFood(JSON.parse(window.localStorage.getItem("food")))
		setPeople(JSON.parse(window.localStorage.getItem("people")))
	}

	const value = {
		food,
		people,
		setPeople,
		currentPerson,
		setCurrentPerson,
		addPerson,
		toggleFood,
		saveState,
		getAmountDue,
		parseState,
		sendVenmo,
	}

	return (
		<GlobalContext.Provider value={value}>
			{children}
		</GlobalContext.Provider>
	)
}
