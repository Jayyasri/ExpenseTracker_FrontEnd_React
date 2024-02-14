const ExpenseItem = (props) => {
    const {id, title, amount, deleteExpense} = props

    const handleDelete = () => {
        deleteExpense(id)
    }

    return(       
       
        //The first line is by using ternary operator. We use brackets here because ternary operator is a javascript property and we want to use it in react, we need to use brackets. We also use string literals here.  
        //If the amount is less than 0, right side border should be red and if the amount is greater than 0, the border should be green.
        //if we give style for postive (green colour), we give .expense-item.positive in css and for negative(red colour), we give .expense-item.negative
        
        <div className="expense-item-container"> 
            <div className={`expense-item ${amount > 0 ? 'positive' : 'negative'}`} > 
                <div className="expense-title" > {title}   </div> 
                <div className="expense-amount"> {amount}  </div> 
            </div>
            <button className="delete-btn" onClick={handleDelete}> Delete </button>
        </div>
       
    )
}
export default ExpenseItem