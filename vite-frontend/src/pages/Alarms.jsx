import { useEffect, useState } from "react";
import AlarmBar from "../components/AlarmBar";
import AlarmComponent from "../components/AlarmComponent";

const Alarms = () => {
    const [alarms, setalarms] = useState([]);
    const [highbuys, sethighbuys] = useState([]);
    const [crossrsis, setcrossrsis] = useState([]);

    const fetchDataAndProcess = async () => {
        try {
            const alarmsResponse = await fetch("/alarms");
            const highbuysResponse = await fetch("/highbuy");
            const crossrsisResponse = await fetch("/crossrsi");

            if (alarmsResponse.ok && highbuysResponse.ok && crossrsisResponse.ok) {
                const alarmsData = await alarmsResponse.json();
                const highbuysData = await highbuysResponse.json();
                const crossrsisData = await crossrsisResponse.json();

                setalarms(alarmsData);
                sethighbuys(highbuysData);
                setcrossrsis(crossrsisData);
            } else {
                throw new Error("Something went wrong with the response");
            }
        } catch (error) {
            console.log("Something went wrong!");
            console.error(error);
        }
    };



    useEffect(() => {
        fetchDataAndProcess();
        const interval = setInterval(() => {
            fetchDataAndProcess();
            console.log("success!")
        }, 60*1000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1 className="heading">Alarms</h1>
           
            
            <AlarmBar/>
            
            {alarms.map((ele) => (
                <AlarmComponent key={ele[1]} name={ele[0]} price={ele[2]} rsi={ele[3]} symbol={ele[1]} />
            ))}

            <h2 className="sub-heading">Highbuys</h2>
            {highbuys.map((ele) => (
                <AlarmComponent key={ele[1]} name={ele[0]} price={ele[2]} rsi={ele[3]} symbol={ele[1]} />
            ))}

            <h2 className="sub-heading">Cross Rsi's</h2>
            {crossrsis.map((ele) => (
                <AlarmComponent key={ele[1]} name={ele[0]} price={ele[2]} rsi={ele[3]} symbol={ele[1]} />
            ))}
        </div>
    );
};

export default Alarms;
