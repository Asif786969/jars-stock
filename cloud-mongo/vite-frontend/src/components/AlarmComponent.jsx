import ColorComponent from "./ColorComponent";
import BoxComponent from "./Boxcomponenet";
import { styled } from "styled-components";
import {Logosvg} from "./LogoComponent";
const StockElement = styled.div`

  display:grid;
  grid-template-columns:3fr 3fr 3fr 2fr;  
  padding-left:6rem;

`;
const AlarmComponent=({name,price,rsi,symbol})=>{
    const handleClick=()=>{
        
        const url="https://in.tradingview.com/chart/LrprtqNZ/?symbol="+symbol.slice(0,-3);
        window.open(url,'_blank');
        
        
    };
    return(
        <StockElement className="stockName">
            <BoxComponent element={name}/>
            <BoxComponent element={price}/>
            <BoxComponent element={<ColorComponent value={rsi}/>} />  
            <p onClick={handleClick}><Logosvg/></p>
   
        </StockElement>
    );
    

}
export default AlarmComponent;