import React, { useContext, useState } from 'react'

const GlobalContext = React.createContext();

export function useGlobalContext() {
  return useContext(GlobalContext);
}

export function GlobalProvider({ children }) {
  const [food, setFood] = useState([
    {
      name: "Pizza",
      cost: 7,
      count: 2,
    },
    {
      name: "Burger",
      cost: 10,
      count: 1,
    },
    {
      name: "Sandwhich",
      cost: 5,
      count: 1,
    },
    {
      name: "Cookie",
      cost: 2,
      count: 3,
    },
    {
      name: "Milkshake",
      cost: 4,
      count: 4,
    }
  ])

  const [people, setPeople] = useState([
    {
      name: "Farooq",
      venmo: "venmo-farooq",
      foodSelected: ["Pizza, Cookie", "Milkshake"]
    },
    {
      name: "Bowen",
      venmo: "venmo-bowen",
      foodSelected: ["Pizza, Sandwhich, Cookie", "Milkshake"]
    },
    {
      name: "Neil",
      venmo: "venmo-farooq",
      foodSelected: ["Pizza, Cookie", "Milkshake"]
    },
    {
      name: "Steven",
      venmo: "venmo-steven",
      foodSelected: ["Cookie", "Milkshake"]
    }
  ])

  function addPerson(name, venmo) {
    setPeople([...people, {
      name: name,
      venmo: venmo,
      foodSelected: []
    }])
  }

  function toggleFood(food, name, value) {
    const foodTemp = food
    const peopleTemp = people

    if (value) {
      food.forEach(item => {
        if (item.name === name) {
          item.count++;
        }
      });

      people.forEach(person => {
        if (person.name === name) {
          person.foodSelected.push(food)
        }
      })
    } else {
      food.forEach(item => {
        if (item.name === name) {
          item.count--;
        }
      });

      people.forEach(person => {
        if (person.name === name) {
          person.foodSelected.filter((foodItem) => foodItem !== food)
        }
      })
    }

    setFood(foodTemp)
    setPeople(peopleTemp)
  }

  function getAmountDue(name) {
    people.forEach(person => {
      if (person.name === name) {
        const foodsSelected = person.foodSelected
        let price = 0

        foodsSelected.forEach(selectedFood => {
          food.forEach(food => {
            if (food.name === selectedFood) {
              price += food.cost / food.count
            }
          })
        })

        return price
      }
    })

    return 0
  }

  function sendVenmo(person){
      let amount = getAmountDue(person.name);
      let s = "https://venmo.com/?txn=charge&audience=public&recipients=" + person.venmo + "&amount=" + amount + "&note=ThisisyourbillsplitbyResweet!"
  }


  const value = {
    food,
    people,
    addPerson,
    toggleFood
  }

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  )
}