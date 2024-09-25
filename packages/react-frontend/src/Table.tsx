import React from "react";

interface TableProps {
    characterData: { name: string, job: string }[];
    removeOneCharacter: (index: number) => void;
}

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Remove Character</th>
            </tr>
        </thead>
    );
}

const TableBody: React.FC<TableProps> = ({
    characterData, 
    removeOneCharacter
}) => {
    const rows = characterData.map((row, index) => {
        return (
            <tr key={index}>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>
                    <button
                        onClick={() => removeOneCharacter(index)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    }
    );
    return (
        <tbody>
            {rows}
        </tbody>
    );
}

const Table: React.FC<TableProps> = ({ 
    characterData, 
    removeOneCharacter
}) => {
    return (
        <table>
            <TableHeader />
            <TableBody 
                characterData={characterData}
                removeOneCharacter={removeOneCharacter}
            />
        </table>
    );
}

export default Table;