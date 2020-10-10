import React from 'react';

const Person = ({person,index,number,id,removePerson}) =>{
    return(
        <li key= {index}>
            {person} {number} <button onClick= {() => removePerson(id,person)} >delete</button>
        </li>
    )
}

export default Person;