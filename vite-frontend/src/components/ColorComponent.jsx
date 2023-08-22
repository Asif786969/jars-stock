const ColorComponent=({value})=>{
    const color = value>=0 ? "#007560":"#bd1414";
    return(
        <p style={{color}}>
            {value}
        </p>
    );
};

export default ColorComponent;