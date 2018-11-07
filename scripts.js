/* Total Profit */

//Pull profit into new array and reduce, adding together all values
let profitArray = cars.map(sale => sale.gross_profit)
let totalProfit = profitArray.reduce((total, sale) => total + sale)

document.querySelector("#totalProfit").textContent = totalProfit.toLocaleString("en-US", {style: "currency", currency:"USD"})


/* Month with most sales */

// Pull the months from purchase_date into new array and reduce into an object that counts the months
let monthsArray = cars.map(date => date.purchase_date.slice(5,7))

let countedMonths = monthsArray.reduce((accumulator, current) => {
  accumulator[current] = (accumulator[current] || 0) + 1
  return accumulator
}, {})

// Loop through counted months object's keys and find the one with most sales
let mostSalesMonth = Object.keys(countedMonths).reduce((a,b) => countedMonths[a] > countedMonths[b] ? a : b)

//Convert number to month name and output to DOM
let month = new Date("2017", mostSalesMonth - 1)
month = month.toLocaleString("en-US", {month: "long"})

document.querySelector("#monthMostCars").textContent = `${month} had the most sales.`


/* Sales Agent with Most Sales */
// Reduce array into object that counts each sale by agent. Make the keys out of their first and last name to use as output of result.
let agentSales = cars.reduce((agents, current) => {
  let f = current.sales_agent.first_name
  let l = current.sales_agent.last_name
  agents[`${f}_${l}`] = (agents[`${f}_${l}`] || 0) + 1
  return agents
}, {})

// loop through keys in agentSales to find agent with most sales
let agentMost = Object.keys(agentSales).reduce((a,b) => agentSales[a] > agentSales[b] ? a : b)

document.querySelector("#mostSales").textContent = agentMost.split("_").join(" ")


/* Sales Agent with Most Profit */
//Reduce array into object that sums up each agents profits. Keys are made from first and last name to use for output of result.

let agentProfit = cars.reduce((agents, current) => {
  let f = current.sales_agent.first_name
  let l = current.sales_agent.last_name
  let profit = current.gross_profit

  agents[`${f}_${l}`] = (agents[`${f}_${l}`] || 0) + profit
  return agents

}, {})

//loop through keys in agentProfit
let agentMostProfit = Object.keys(agentProfit).reduce((a,b) => agentProfit[a] > agentProfit[b] ? a : b)

document.querySelector("#mostProfit").textContent = agentMostProfit.split("_").join(" ")


/* Most popular Model */

let models = cars.reduce((models, current) => {
  let model = current.vehicle.model
  let make = current.vehicle.make
  let key = `${make}_${model}`

  models[key] = (models[key] || 0) + 1
  return models
}, {})

//loop through keys in agentProfit
let mostCommonModel = Object.keys(models).reduce((a,b) => models[a] > models[b] ? a : b)

document.querySelector("#popularModel").textContent = mostCommonModel.split("_").join(" ")


/* Bank with most loans */

let banks = cars.reduce((banks, current) => {
  let bank = current.credit.credit_provider
  let key = bank.split(" ").join("_")
  banks[key] = (banks[key] || 0) + 1
  return banks
}, {})

//loop through keys in agentProfit
let mostBank = Object.keys(banks).reduce((a,b) => banks[a] > banks[b] ? a : b)

document.querySelector("#mostLoans").textContent = mostBank.split("_").join(" ")