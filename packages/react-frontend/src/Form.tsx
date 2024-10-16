import React, { useState } from "react";

interface FormProps {
    handleSubmit: (person: { id: string, name: string, job: string }) => void;
}

const Form: React.FC<FormProps> = ({ handleSubmit }) => {
    const [person, setPerson] = useState({
        id: "",
        name: "",
        job: ""
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "job") {
            setPerson({
                id: "",
                name: person["name"],
                job: value
            })
        }
        else {
            setPerson({
                id: "",
                name: value,
                job: person["job"]
            })
        }

    }

    const submitForm = () => {
        handleSubmit(person);
        setPerson({
            id: "",
            name: "",
            job: ""
        });
    }

    return (
        <form>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                id="name"
                value={person.name}
                onChange={handleChange}
            />
            <label htmlFor="job">Job</label>
            <input
                type="text"
                name="job"
                id="job"
                value={person.job}
                onChange={handleChange}
            />
            <input
                type="button"
                value="Submit"
                onClick={submitForm}
            />
        </form>
    );
}

export default Form;