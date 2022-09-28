import React, { useState } from 'react';
import { Button } from "react-bootstrap";
import { ITableRowProps, ITableRowPropsWithButtons, ITableCell } from './types/Table';

const DisplayRow: React.FC<ITableRowProps> = ({ row, index, exclude, edit, children }) => {
    const filters = exclude ? exclude : [""]
    const filteredRow = Object.entries(row).filter((keyValuePair) => !filters.includes(keyValuePair[0]))

    return (
        <>
            {filteredRow.map((keyValuePair) => (edit?.editable && keyValuePair[0] === edit.column) ?
                <td> <input data-id={index} type="text" value={keyValuePair[1]} onChange={edit.change} /> </td> :
                <td> {keyValuePair[1]} </td>
            )}
            {children}
        </>
    )
}

const DisplayRowWithButtons: React.FC<ITableRowPropsWithButtons> = ({ row, index, exclude, putItem, deleteItem, saveItem, changeItem }) => {

    const [editable, setEditable] = useState<ITableCell>({ editable: false, column: "", change: undefined });

    const editTableCell = () => {
        const editObject = {
            editable: !editable?.editable,
            column: "policy",
            change: changeItem
        }
        setEditable(editObject);
    };

    return (
        <DisplayRow row={row} index={index} exclude={exclude} edit={editable}>
            {
                changeItem ?
                    <td className="text-center">
                        <Button variant="primary" className="btn-block btn-fill" onClick={editTableCell}>Edit</Button>
                        <Button variant="success" className="btn-block btn-fill" onClick={saveItem}>Confirm</Button>
                    </td> :
                putItem ?
                    <td className="text-center">
                        <Button variant="success" className="btn-block btn-fill" onClick={putItem}>Grant</Button>
                        <Button variant="danger" className="btn-block btn-fill" onClick={deleteItem}>Deny</Button>
                    </td> :
                    <td className="text-center">
                        <Button variant="danger" className="btn-block btn-fill" onClick={deleteItem}>Revoke</Button>
                    </td>                   
            }
        </DisplayRow>
    )
}

export { DisplayRow, DisplayRowWithButtons }