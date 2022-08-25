import React from 'react';
import { Button } from "react-bootstrap";
import { ITableRowProps, ITableRowPropsWithButtons } from '../../Models/Table';

const DisplayRow: React.FC<ITableRowProps> = ({ row, index, changePolicy, exclude, children }) => {
    const filters = exclude ? exclude : [""]
    const filteredRow = Object.entries(row).filter((keyValuePair) => !filters.includes(keyValuePair[0]))

    return (
        <>
            {filteredRow.map((keyValuePair) => keyValuePair[0] === 'policy' ? 
                <td className="text-center">
                    <input data-id={index} type="text" value={keyValuePair[1]} onChange={changePolicy} />
                </td> : <td> {keyValuePair[1]} </td>
            )}
            {children}
        </>
    )
}

const DisplayRowWithButtons: React.FC<ITableRowPropsWithButtons> = ({ row, index, exclude, putItem, deleteItem, savePolicy, changePolicy }) => {
    return (
        <DisplayRow row={row} index={index} exclude={exclude} changePolicy={changePolicy}>
            { !savePolicy ?
                <td className="text-center">
                    <Button variant="success" className="btn-block btn-fill" onClick={putItem}>Grant</Button>
                    <Button variant="danger" className="btn-block btn-fill" onClick={deleteItem}>Deny</Button>
                </td> : 
                <td className="text-center">
                    <Button variant="success" className="btn-block btn-fill" onClick={savePolicy}>Update</Button>
                </td>            
            }
        </DisplayRow>
    )
}

export { DisplayRow, DisplayRowWithButtons }