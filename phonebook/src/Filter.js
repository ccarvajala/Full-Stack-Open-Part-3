import React from "react";

const Filter = ({search, handleNameFilter}) => {
    return(
        <div>
            filter shown with <input value={search} onChange={handleNameFilter}/>
        </div>
    )
}

export default Filter