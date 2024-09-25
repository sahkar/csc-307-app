import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";


const MyApp = () => {
    const [characters, setCharacters] = useState([]);

    const removeOneCharacter = (index:number) => {
        console.log(index);
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacters(updated);
    }
     
    return (
        <div className="container">
            <Table 
                characterData={characters} 
                removeOneCharacter={removeOneCharacter}
            />
            <Form />
        </div>
    );
}


 

export default MyApp;