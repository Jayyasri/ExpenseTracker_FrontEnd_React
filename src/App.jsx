import { useEffect, useState } from "react"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseItem from "./components/ExpenseItem"
import axios from "axios"



const App = () => {    //App component means create a app function
  /* return(
    <>
      <ExpenseItem title="Food" amount = {50} />
      <ExpenseItem title="Movie" amount = {200} />
    </>
  ) */
  
  //Another way of writing the return function is below. It uses array of objects and the map. We write key for the purpose of virtual DOM.



  ///*****************Connecting backend to frontend********************************** */

  const [expenses,setExpenses] = useState([
    // { id:1, title: "Food", amount: -50 },
    //  { id:2, title: "Movie", amount: -200 },    //---------->  We are calling the useState function as an empty array
    //  { id:3, title: "Salary", amount: 5000 }

  ])

  useEffect(() => { //This will give cors error because of different domains. So we install cors in the backend code or we ca whitelist the domains. But now we use only cors.
    axios.get('https://expensetracker-apis-22ui.onrender.com/get-entries') //Here axios returns a promise, so we use then and catch
    .then(res => {
      console.log(res.data)
      setExpenses(res.data)
    })
    .catch(err => console.log(err))
  }, []) //Here we are passing a empty, if we want 

  const addExpense = (title,amount) => {
    const nextId = expenses[expenses.length-1].id + 1 
    setExpenses([...expenses , {id: nextId, title:title, amount:amount}])
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((exp) => exp.id !== id))
  }


  let income = 0, expense = 0
 
  expenses.forEach((exp) => {
    if(exp.amount > 0){
      income += exp.amount
    }
    else{
      expense += exp.amount
    }
  })

  
  return ( //while passing as array of objects, we use map. And also, if we use map we need to use key here for the purpose of virtual dom.
  <>
    <div>
        <div className="heading"> Expense Tracker </div>
        <div className="balance"> Balance: {income + expense} </div>
        <div className="income-expense-container">
          <div className="income">
              <span className="title"> Income </span>
              <span> {income} </span> 
          </div> 

          <div className="block"> </div>

          <div className="expense">
              <span className="title"> Expense </span>
              <span> {expense} </span> 
          </div>
        </div>
        <ExpenseForm addExpense={addExpense}/>
    </div>
    

    {expenses.map((expense) => (
      <ExpenseItem 
      key = {expense.id} 
      title = {expense.title} 
      amount = {expense.amount}
      id = {expense.id}
      deleteExpense = {deleteExpense}
      />

    ))}

  </>
) 
}
export default App



