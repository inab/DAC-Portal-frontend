import React from 'react';
import { Table } from "react-bootstrap";
import { DataRequest, Policy, Assertion } from '../../../../Domain/Entities/Entities';
import { ITableProps} from './types/Table';
import { DisplayRow, DisplayRowWithButtons }  from './TableRow';

const PageTable: React.FC<ITableProps> = ({ allRows, labels, exclude, putItem, deleteItem, saveItem, changeItem }) => {
    const withButtons = ( putItem || deleteItem || saveItem || changeItem ) ? true : false

    return (
        <>
            <Table className="table-hover table-striped">
                <thead>
                    <tr>
                        {Object.values(labels).map(element => <th key={element} className="border-0"> {element} </th> )}
                    </tr>
                </thead>
                <tbody>
                    {allRows.map((row: DataRequest | Policy | Assertion, index: number) => withButtons ? (
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