import React, { useState } from "react";
import Table from "./Table";

const MyApp = () => {
    const [characters, setCharacters] = useState([
        {
            name: "Charlie",
            job: "Janitor"
        },
        {
            name: "Mac",
            job: "Bouncer"
        },
        {
            name: "Dee",
            job: "Aspring actress"
        },
        {
            name: "Dennis",
            job: "Bartender"
        }
    ]);

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
        </div>
    );
}


 

export default MyApp;