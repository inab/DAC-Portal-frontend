import React, { ReactElement } from "react";
import { DataRequest, Assertion, Policy } from '../../../../../Domain/Entities/Entities'

export declare type Labels = {
    user: string,
    fileId: string,
    resource: string,
    comment: string,
    access: string,
    status: string,
    dacId: string,
    policy: string,
    sub: string,
    type: string,
    value: string,
    source: string,
    by: string,
    asserted: string
};

export type Handlers = {
    putItem: React.MouseEventHandler<HTMLButtonElement>
    deleteItem: React.MouseEventHandler<HTMLButtonElement>
    saveItem: React.MouseEventHandler<HTMLButtonElement>
    changeItem: React.ChangeEventHandler<HTMLInputElement>
}

export interface ITableProps {
    allRows: Array<DataRequest | Policy | Assertion>,
    labels: Partial<Labels>,
    exclude?: Array<string>,
    putItem?: (row: DataRequest | Policy | Assertion, index: number) => void,
    deleteItem?: (row: DataRequest | Policy | Assertion, index: number) => void,
    saveItem?: (row: DataRequest | Policy | Assertion) => void,
    changeItem?: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export interface ITableRowProps {
    row: DataRequest | Policy | Assertion,
    index: number,
    change?: React.ChangeEvent<HTMLInputElement>,
    edit?: ITableCell,
    exclude?: Array<string>,
    children?: ReactElement
};
  
export interface ITableRowPropsWithButtons {
    row: DataRequest | Policy | Assertion,
    index: number,
    exclude?: Array<string>,
    putItem: Handlers["putItem"] | undefined
    deleteItem: Handlers["deleteItem"] | undefined
    saveItem: Handlers["saveItem"] | undefined
    changeItem: Handlers["changeItem"] | undefined
};

export interface ITableCell {
    editable: boolean,
    column: string,
    change: React.ChangeEventHandler<HTMLInputElement> | undefined
};