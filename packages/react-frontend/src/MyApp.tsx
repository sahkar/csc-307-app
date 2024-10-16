import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

interface Character {
    name: string;
    job: string;
}

const MyApp = () => {
    const [characters, setCharacters] = useState<Character[]>([]);

    const removeOneCharacter = (index: number) => {
        console.log(index);
        const updated = characters.filter((character, i) => {
            return i !== index;
        });
        setCharacters(updated);
    }

    const updateList = (person: Character) => {
        setCharacters([...characters, person])
    }

    const fetchUsers = () => {
        const promise = fetch("http://localhost:8000/users")
        return promise;
    }

    useEffect(() => {
        fetchUsers()
            .then((res) => res.json())
            .then((json) => setCharacters(json["users_list"]))
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="container">
            <Table
                characterData={characters}
                removeOneCharacter={removeOneCharacter}
            />
            <Form handleSubmit={updateList} />
        </div>
    );
}

export default MyApp;