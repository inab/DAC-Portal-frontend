import React from 'react';
import { Button } from "react-bootstrap";
import { ITableRowProps, ITableRowPropsWithButtons } from '../../Models/Table';

const DisplayRow: React.FC<ITableRowProps> = ({ row, exclude, children }) => {
    const filters = exclude ? exclude : [""]
    const filteredRow = Object.entries(row).filter((keyValuePair) => !filters.includes(keyValuePair[0]))
    return (
        <> 
            {filteredRow.map((keyValuePair) => <td> {keyValuePair[1]} </td>)} 
            {children} 
        </>
    )
}

const DisplayRowWithButtons: React.FC<ITableRowPropsWithButtons> = ({ row, exclude, putItem, deleteItem }) => {
    return (
        <DisplayRow row={row} exclude={exclude}>
            <td className="text-center">
                <Button variant="success" className="btn-block btn-fill" onClick={putItem}>Grant</Button>
                <Button variant="danger" className="btn-block btn-fill" onClick={deleteItem}>Deny</Button>
            </td>
        </DisplayRow>
    )
}

export { DisplayRow, DisplayRowWithButtons }