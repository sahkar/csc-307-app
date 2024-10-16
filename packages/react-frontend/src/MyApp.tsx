import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

interface Character {
    id : string;
    name: string;
    job: string;
}

const MyApp = () => {
    const [characters, setCharacters] = useState<Character[]>([]);

    const removeOneCharacter = (id: string) => {
        deleteUser(id)
            .then((res) => {
                if (res.status === 204) {
                    const updated = characters.filter((character) => {
                        return character.id !== id
                    });
                    setCharacters(updated);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const updateList = (person: Character) => {
        postUser(person)
            .then((res) => {
                if (res.status === 201) {
                    return res.json();
                }
            })
            .then((character) => {
                if (character && character.id) setCharacters((prevCharacters) => [...prevCharacters, character]);
            })
            .catch((error) => {
                console.log(error);
            })
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
    console.log(characters);

    const postUser = (person: Character) => {
        const promise = fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(person)
        });

        return promise;
    }

    const deleteUser = (id: string) => {
        const promise = fetch(`http://localhost:8000/users/${id}`, {
            method: "DELETE", 
            headers: {
                "Content-Type": "application/json"
            }
        });

        return promise;
    }

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