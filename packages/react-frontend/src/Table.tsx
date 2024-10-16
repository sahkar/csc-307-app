import React from "react";

interface TableProps {
    characterData: { id: string, name: string, job: string }[];
    removeOneCharacter: (id: string) => void;
}

const TableHeader = () => {
    return (
        <thead>
            <tr>
                <th>Id</th>
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
    const rows = characterData.map((row) => {
        return (
            <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.job}</td>
                <td>
                    <button
                        onClick={() => removeOneCharacter(row.id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        );
    });
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