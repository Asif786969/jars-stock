import Logosvg from "../components/LogoComponent"
import StockComponent from "../components/StockComponent";
import { useEffect, useState } from "react";
import "./StockPage.css";
import BoxComponent from "../components/Boxcomponenet";
import StockBar from "../components/StockBar";




const StockPage = () => {
    const [stocks, setStocks] = useState([]);
    
    const [newStocks, setNewStocks] = useState([]);
    
    const [sortstocksbyprice,setSortStocksPrice]=useState(false);
    const [sortstockbyvolume,setSortStockVolume]=useState(false);
    const [sortstockbychange,setSortStockChange]=useState(false);
    



    const fetchData = async (symbol) => {
        
        

        try {
            const response = await fetch('http://localhost:9131/symbol', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: symbol,
            });

            if (response.ok) {
                const latestData = await response.json();
                const dailyChange = (((latestData[1] - latestData[2]) / latestData[2]) * 100).toFixed(2);
                
               
                return [parseFloat(latestData[1]).toFixed(2),dailyChange,latestData[3]];
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        try {
            fetch('http://localhost:3000/stocks')
            .then(res => res.json())
            .then(data => {
                setStocks(data);
            });
        } catch (error) {
            console.log(error+" happened in jsonserver")
        }
        

        //fetchData("AMBUJACEM.NS");
    }, []);


        const updateStocksData = async () => {
            const updatedStocks = await Promise.all(stocks.map(async (stock) => {
                const list=await fetchData(stock.Symbol + (stock.Exchange === 'NSE' ? '.NS' : '.BO'));
                const price = list[0];
                const index=stock.Symbol+(stock.Exchange === 'NSE' ? '.NS' : '.BO');
                const change=list[1];
                const volume=list[2];
                
                return {
                    name: stock.Name,
                    price: price || 0,
                    index:index,
                    change:change,
                    volume:volume,
                    
                };
            }));
            setNewStocks(updatedStocks);

            
        
        };

        useEffect(()=>{
            updateStocksData();
        },[stocks])

        
    

    
    

    const sortStocksByPrice=()=>{
        const sortedStocks=[...newStocks]
        sortedStocks.sort((a,b)=>a.price-b.price);
        setNewStocks(sortedStocks);
        setSortStocksPrice(true);
        setSortStockVolume(false);
        setSortStockChange(false);
    }

    const sortStockByVolume=()=>{
        const sortedStocks=[...newStocks]
        sortedStocks.sort((a,b)=>a.volume*a.price-b.volume*b.price);
        setNewStocks(sortedStocks);
        setSortStockVolume(true);
        setSortStockChange(false);
        setSortStocksPrice(false);
    }

    const sortStockByChange=()=>{
        const sortedStocks=[...newStocks];
        sortedStocks.sort((a,b)=>a.change-b.change);
        setNewStocks(sortedStocks);
        setSortStockChange(true);
        setSortStocksPrice(false);
        setSortStockVolume(false);
   
    
        
        
    }

    

    const handleClickRefresh = async () => {
        
    
        const refreshCaller = async () => {
            
            try {
                const response = await fetch("http://localhost:9131/refresh");
                
                console.log("refresh success");
                updateStocksData();
                console.log("updated")
            } catch (error) {
                console.log(error + "error in refresh button");
            }
        };

        refreshCaller();
    
        
        
    };
    
    
    return (
        <div>
            <h1 className="heading">Stocks</h1>
            <StockBar sortStocksbyprice={sortStocksByPrice} sortStocksbyvolume={sortStockByVolume} sortStocksbychange={sortStockByChange}/>
            <button onClick={handleClickRefresh}>Refresh</button>
           
            

            {  newStocks.map((ele) => (
                <StockComponent
                    key={ele.name}
                    name={ele.name}
                    price={ele.price}
                    change={ele.change}
                    symbol={ele.index}
                    volume={ele.volume}
                />
            ))}
            
        </div>
    );
};


export default StockPage;
