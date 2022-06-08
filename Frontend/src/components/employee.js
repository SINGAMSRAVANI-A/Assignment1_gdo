import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import  {useLocation} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { getAllGoals } from './apis/goalsapi';

const Employee = () => {
  const [goals,setgoals]=useState([]);
  const location = useLocation();
  const navigate = useNavigate();


  var todayDate = new Date().toISOString().slice(0, 7);  
  
  const [Month,setMonth] = useState(todayDate);
  const MDate=new Date().toISOString().slice(0, 10)
  const columns = [
    {
      name: "Goal",
      selector: (row) => row.goal,
    },
    {
      name: "Status",
      selector: (row) => row.status,
    },    
  ];  
  useEffect(()=>{
    async function getData(){
      const goals=await getAllGoals(location.state.id,Month);
      setgoals(goals)        
        }
    getData();
},[Month]);


  return (
    <div>
              Employee page
      <br></br>
      <br></br>     
    <label htmlFor="start">Select month and year : </label>
    <input type="month" onChange={(e)=>{setMonth(e.target.value);}} value={Month}/>
    <br></br>
    <br></br>           
    <button
          onClick={() => {
            navigate("/addgoal", {
              state: { id: location.state.id },
            });
          }}
        >
          Add Goal
        </button>
    <br></br>     
    <br></br>     
      Goals :      
            <DataTable
            columns={columns}
            data={goals}
          />
    <br></br>     
    <br></br>
      <button
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
</div>
  )
}

export default Employee;
