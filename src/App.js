import React, { useEffect, useState } from "react";
import Button from "./components/Button";
import axios from "axios";
import CandidateCard from "./components/CandidateCard";
import "./styles.css";
  
const getData =( {page,salaryorder})=>{

  console.log(page)
  return axios("http://localhost:3000/candidates",
  {
    method: "GET",
    params:{
       
      _page: page,
      _limit:5,
      _sort:"salary",
      _order: `${salaryorder}`,
    }
  })
}
 



export default function App() {
  const [isloading, setLoading]= useState(true);
  const [error, setError]= useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [salaryorder, setSalaryorder] = useState("asc");
  const [txt, setTxt] = useState("Sort by Ascending Salary")

  useEffect(()=>{
    getData({page,salaryorder})
    // setLoading(true)
    .then((res)=>{
      console.log(res.data)
      console.log(res);
       setLoading(true)
      setData(res.data);
      setLoading(false);
    })
    .catch((err)=>{
      console.log(`Something went wrong!`);
      setError(true);
      setLoading(false);
    })
  },[page,salaryorder])
  


  return (
    <div className="App">
      {isloading &&<div id="loading-container">...Loading</div>}
      <div>
        
        
        <Button  id="SORT_BUTTON" title={txt} onClick={()=> {setSalaryorder("desc")
      setTxt("Sort by Descending Order ")}}  />
        <Button disabled={page===1} onClick={()=>setPage(page-1)} title="PREV" id="PREV" />
        <Button id="NEXT"  onClick={()=>setPage(page+1)}title="NEXT" />
      </div>
      {data.map((item) => <CandidateCard key={item.id}{...item}/>)}
    </div>
  );
}
