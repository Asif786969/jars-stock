import { styled } from "styled-components"

const BoxElement = styled.div`

  display:flex;
  align-items:center;
  justify-content:center;
  font-size:1rem;
  font-weight:bold;
  background:#e7eaf6;
  height:2rem;
  width:5rem;
  border-radius:0.5rem;

`;

const BoxComponent=({element})=>{
    return(
        <BoxElement>{element}</BoxElement>
    );
    
}
export default BoxComponent;