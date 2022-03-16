import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import "./weathercard.css";


const initState={
    query:"",
    data:[]
}

function WeatherInfo() {
//    const [query,setQuery] = useState("")
//    const [data,setData] = useState([]);
   const [state,setState] = useState(initState);
   const ApiKey = process.env.REACT_APP_API_KEY
   const handleChange = (e)=>{
       console.log(e.target.value)
       setState({...state,query:e.target.value})
   }
   useEffect(()=>{
       handleSearch()
   },[])

   const handleSearch = (e)=>{
    axios({
        method:"get",
        baseURL:"http://api.weatherapi.com/v1",
        url:"/current.json",
        params:{
            key:ApiKey,
            q:state.query || "Delhi"
        }
    }).then(res=>setState({...state,data:res.data}) ).catch(err=>console.log(err))

   }
   console.log(state.data,"state")
  return (
    <>

<div id="main">
  <h3 id="morning_degree">weather</h3>
  <h3 id="night_degree"> forecast</h3>
  <div id="moon"></div>
  <div id="mountains"></div>
  <div id="river"></div>
  <div id="sun"></div>
</div >
  

  <div id="maindiv"> 
     <input id="locationInp" type="text" placeholder='Enter City' value={state.query} onChange = {handleChange}/>
     <button id="locationBtn" onClick={handleSearch}>Search</button>
     {state?.data?.location && 
     <h2 class="weather_name1">{state.data?.location?.name}</h2>}
     {state?.data?.current && <>
     <h5 class="weather_name2">{state?.data?.current?.condition?.text}</h5>
       
      <img id="weather_icon" src={state?.data.current?.condition?.icon} alt="weather icon"/>
      </>
      }
      </div>
    </>
  )
}

export default WeatherInfo
