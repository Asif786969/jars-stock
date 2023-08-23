import BoxComponent from "./Boxcomponenet";
import { styled } from "styled-components";
import Sortsvg from "./SvgComponent";



const BarElement = styled.div`

  display:grid;
  grid-template-columns:2fr 3fr 3fr 3fr 2fr;  
  
  border-style:solid;
  border-width:0.3rem;
  border-color:black;
  padding:1rem 1rem 1rem 1rem;

`;
const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction:row;
  justify-content:center;
  font-size:1.2rem;

`;
//{fontSize:"1.5rem",marginLeft:"-8rem"}
const StockBar=({sortStocksbyprice,sortStocksbyvolume,sortStocksbychange})=>{

   

    return(
        <BarElement >
            <ItemContainer>

        <h2>Stock</h2>
            </ItemContainer>
        <ItemContainer>
            <h2 >Price</h2>
            <p onClick={sortStocksbyprice}><Sortsvg/></p>
        </ItemContainer>
        <ItemContainer>
            <h2>Change</h2>
            <p onClick={sortStocksbychange}><Sortsvg/></p>
            

        </ItemContainer>
        
        <ItemContainer>
            <h2>Volume</h2>
            <p onClick={sortStocksbyvolume}><Sortsvg/></p>
        </ItemContainer>
        <ItemContainer>

        <h2>TradingView</h2>
        </ItemContainer>
        
        
              
        
        </BarElement>
    );
}
export default StockBar;