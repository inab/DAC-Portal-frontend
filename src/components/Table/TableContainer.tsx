import React from 'react';
import { Table } from "react-bootstrap";
import { Request, Policy, ITableProps} from '../../Models/Table';
import { DisplayRow, DisplayRowWithButtons }  from './TableRow';

const PageTable: React.FC<ITableProps> = ({ allRows, labels, exclude, putItem, deleteItem, savePolicy, changePolicy }) => {
    let withButtons = ( putItem || deleteItem || savePolicy || changePolicy ) ? true : false

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
                                savePolicy={savePolicy ? () => savePolicy(row) : null }
                                changePolicy={changePolicy ? 
                                    (e: React.ChangeEvent<HTMLInputElement>) => changePolicy(e) : null } />            
                        </tr> ) : <tr> <DisplayRow row={row} index={index} exclude={exclude} /> </tr>  
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default PageTable;