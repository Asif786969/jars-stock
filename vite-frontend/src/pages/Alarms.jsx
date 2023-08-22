import { useEffect, useState } from "react";


import AlarmBar from "../components/AlarmBar";
import AlarmComponent from "../components/AlarmComponent";
const Alarms=()=>{
    const[alarms,setalarms]=useState([]);

    const fetchData=async()=>{
        try {
            const response=await fetch("http://localhost:9041/alarms")
            if(response.ok){
                const data=await response.json();
                console.log(data)
                setalarms(data);
            }
            else{
                throw Error
            }
        } catch (error) {
            console.log("boy something is wrong!")
            console.log(error)
        }
    }
    // useEffect(()=>{

    //     fetchData();
    // });
    const call=()=>{
        fetchData();
    }
    
    return(
        <div>
            <h1 className="heading">Alarms</h1>
            <button onClick={call}>click</button>
            
            <AlarmBar/>
            
           {
            alarms.map((ele)=>(
                <AlarmComponent
                    key={ele[1]}
                    name={ele[0]}
                    price={ele[2]}
                    rsi={ele[3]}
                    symbol={ele[1]}

                />
            ))
           }
        </div>
    );
}
export default Alarms;