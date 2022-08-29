import React from 'react';
import { Table } from "react-bootstrap";
import { Request, Policy, Permission, ITableProps} from '../../Models/Table';
import { DisplayRow, DisplayRowWithButtons }  from './TableRow';

const PageTable: React.FC<ITableProps> = ({ allRows, labels, exclude, putItem, deleteItem, saveItem, changeItem }) => {
    let withButtons = ( putItem || deleteItem || saveItem || changeItem ) ? true : false

    return (
        <>
            <Table className="table-hover table-striped">
                <thead>
                    <tr>
                        {Object.values(labels).map(element => <th className="border-0"> {element} </th> )}
                    </tr>
                </thead>
                <tbody>
                    {allRows.map((row: Request | Policy | Permission, index: number) => withButtons ? (
                        <tr> 
                            <DisplayRowWithButtons
                                row={row}
                                index={index}
                                exclude={exclude}
                                putItem={putItem ? () => putItem(row, index) : undefined}
                                deleteItem={deleteItem ? () => deleteItem(row, index) : undefined} 
                                saveItem={saveItem ? () => saveItem(row) : undefined}
                                changeItem={changeItem ? (e) => changeItem(e) : undefined } />            
                        </tr> ) : <tr> <DisplayRow row={row} index={index} exclude={exclude} /> </tr>  
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default PageTable;