import { Link } from "react-router-dom";

import ColorComponent from "../components/ColorComponent";
import { useEffect, useState } from "react";
import Sortsvg from "../components/SvgComponent";


const Explore = () => {
    
    const [nifty50,setnifty50]=useState(100000);
    const [banknifty,setbanknifty]=useState(100000);
    const [dowjones,setdowjones]=useState(100000);
    const [sp500,setsp500]=useState(100000);
    const [londonexch,setlondonexch]=useState(100000);

    //DAILY CHANGES FOR EXCHANGES
    const [niftychng,setniftychng]=useState(0);
    const [bankniftychng,setbankniftychng]=useState(0);
    const [dowjoneschng,setdowjoneschng]=useState(0);
    const [sp500chng,setsp500chng]=useState(0);
    const [londoncnhg,setlondonexchchng]=useState(0);

    
    useEffect(()=>{ 
      const fetchData =async()=>{

        await fetchindex('%5ENSEI',setnifty50,setniftychng);
        await fetchindex('%5ENSEBANK',setbanknifty,setbankniftychng);
        await fetchindex('%5EDJI',setdowjones,setdowjoneschng);
        await fetchindex('%5EGSPC',setsp500,setsp500chng);
        await fetchindex('LSEG.L',setlondonexch,setlondonexchchng);
      };
      const interval = setInterval(() => {
        fetchData();
      }, 5000);

      return ()=>{
        clearInterval(interval);
      };



    },[]);
    const fetchindex= async (bodydata,setData,setDailychng)=>{
        try {
            const response = await fetch('http://localhost:9131/updatestocklive', {
              method: 'POST',
              headers: {
                'Content-Type': 'text/plain',
              },
              body: bodydata,
            });
      
            if (response.ok) {
              const data = await response.json();
              const dailychange=(((data[1]-data[2])*100)/data[1]).toFixed(2);

              //console.log(dailychange);
             
              setData(parseInt(data[1],10).toFixed(2));
              setDailychng(dailychange);
            } else {
              throw new Error('Failed to fetch nifty50 data');
            }
          } catch (error) {
            console.log(error);
          }
}




    return ( 
        <div className="container-explore">
            <h1 className="rsi-assasins">RSI ASSASSINS</h1>
            <span className="content-assasin">
                <p>RSI ASSASINS WELCOMES YOU AS A PART OF ASSASSIN TEAM. <br/> WE OFFER ALL THE LATEST VALUES OF RSIs OF STOCK 
                THROUGH WHICH YOU CAN MAKE MONEY.</p>
                <p>SELL OR BUY AS PER YOUR WISHES.<br/>GOOD LUCK!!!!.</p>
            </span>
            <Link to='/signin'><button className="login-btn">LOG IN</button></Link>
            <Link to='/signup'><button className="signup-btn">SIGN UP</button></Link>
            <div className="indices-live">
                <h2 className="nifty50">NIFTY50:{nifty50} <ColorComponent value={niftychng}/></h2>
                <h2 className="banknifty">BANKNIFTY:{banknifty} <ColorComponent value={bankniftychng}/></h2>
                <h2 className="dowjones">DOW JONES:{dowjones} <ColorComponent value={dowjoneschng}/></h2>
                <h2 className="sp500">S&P 500:{sp500} <ColorComponent value={sp500chng}/></h2>
                <h2 className="sgxnifty">LONDON EXC:{londonexch} <ColorComponent value={londoncnhg}/></h2>
                
                <Sortsvg/>
            </div>
            
            
        </div>
     );
}
 
export default Explore;