import React from 'react';
import { Table } from "react-bootstrap";
import { Request, Policy, ITableProps} from '../../Models/Table';
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
                    {allRows.map((row: Request | Policy, index: number) => withButtons ? (
                        <tr>
                            <DisplayRowWithButtons
                                row={row}
                                index={index}
                                exclude={exclude}
                                putItem={putItem ? () => putItem(row, index) : null }
                                deleteItem={deleteItem ? () => deleteItem(row, index) : null } 
                                saveItem={saveItem ? () => saveItem(row) : null }
                                changeItem={changeItem ? 
                                    (e: React.ChangeEvent<HTMLInputElement>) => changeItem(e) : null } />            
                        </tr> ) : <tr> <DisplayRow row={row} index={index} exclude={exclude} /> </tr>  
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default PageTable;