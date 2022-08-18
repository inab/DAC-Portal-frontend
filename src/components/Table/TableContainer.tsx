import React from 'react';
import { Table } from "react-bootstrap";
import { Request, ITableProps} from '../../Models/Table';
import { DisplayRow, DisplayRowWithButtons }  from './TableRow';

const PageTable: React.FC<ITableProps> = ({ allRows, labels, exclude, putItem, deleteItem }) => {
    let withButtons = ( putItem || deleteItem ) ? true : false

    return (
        <>
            <Table className="table-hover table-striped">
                <thead>
                    <tr>
                        {Object.values(labels).map(element => <th className="border-0"> {element} </th> )}
                    </tr>
                </thead>
                <tbody>
                    {allRows.map((row: Request, index: number) => withButtons ? (
                        <tr>
                            <DisplayRowWithButtons
                                row={row}
                                exclude={exclude}
                                putItem={(e) => putItem(row, index)}
                                deleteItem={(e) => deleteItem(row, index)} />
                        </tr> ) : <tr> <DisplayRow row={row} exclude={exclude} /> </tr>  
                    )}
                </tbody>
            </Table>
        </>
    )
}

export default PageTable;