import React, { useEffect,useState } from 'react'
import axios from 'axios'



export default function Data() {
    const [expenseData, setExpenseData] = useState([]) 
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")

    const fetchExpenses = () => {
        axios.get("http://localhost:3000/expenses")
          .then((response) => {
            setExpenseData(
              Array.isArray(response.data)
                ? response.data
                : []
            );
          })
          .catch(console.log);
      };
      useEffect(() => {
        fetchExpenses();
      }, []);

    const addExpense = () => {
        const url = "http://localhost:3000/expenses"
        const data = {
            title: title,
            amount: amount
        }
        axios.post(url, data)
          .then((res) => {
            console.log(res.data)
            fetchExpenses();
        setTitle("");
        setAmount("");
          })
          .catch((err) => {
            console.log(err)
          })
      }

      const deleteExpense = (id) => {
        axios.delete(`http://localhost:3000/expenses/${id}`)
          .then(() => fetchExpenses());
      };

        // ✅ Dashboard Calculations
  const totalAmount = expenseData.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  )

  const highestExpense = expenseData.length > 0
    ? Math.max(...expenseData.map(e => Number(e.amount)))
    : 0
    
    
      
    
  return (
    <>
    <div className="container">
    <h2>Expense Tracker</h2>

    <div className="dashboard">
        <div className="card">
          <h4>Total Expenses</h4>
          <p>₹ {totalAmount}</p>
        </div>
        <div className="card">
          <h4>Total Entries</h4>
          <p>{expenseData.length}</p>
        </div>
        <div className="card">
          <h4>Highest Expense</h4>
          <p>₹ {highestExpense}</p>
        </div>
      </div>

    <div className="form">
        <input id='expense' type="text" placeholder="Enter expense" onChange={(e) => setTitle(e.target.value)} />
    <input id='amount' type="text" placeholder="Enter amount" onChange={(e) => setAmount(e.target.value)} />
    <button type="submit" onClick={addExpense}>Add Expense</button>
    </div>
    
    <table>
        <thead>
          <tr>
        <th>Expense</th>
        <th>Amount</th>
        <th>Created at</th>
        <th>Operation</th>
    </tr>  
        </thead>

        <tbody>
            {
        expenseData.map((e) => {
            return (
                <tr key={e.id}>
                    <td>{e.title}</td>
                    <td>{e.amount}</td>
                    <td>{e.created_at}</td>
                    <td><button className="delete-btn" onClick={() => deleteExpense(e.id)}>Delete</button></td>
                </tr>
            )
        })
    } 
        </tbody>
    
   
</table>
</div>
</>
  )
}
