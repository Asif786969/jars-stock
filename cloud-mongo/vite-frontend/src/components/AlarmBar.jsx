import { styled } from "styled-components";
const BarElement = styled.div`

  display:grid;
  grid-template-columns:3fr 3fr 3fr 2fr;  
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


const AlarmBar=()=>{
    return (
        <BarElement>
            <ItemContainer>
                <h2>Stock</h2>
            </ItemContainer>

            <ItemContainer>
                <h2>Price</h2>
            </ItemContainer>

            <ItemContainer>
                <h2>RSI</h2>
            </ItemContainer>

            <ItemContainer>
                <h2>TV</h2>
            </ItemContainer>
        </BarElement>
    );
}
export default AlarmBar;