import React, { ReactElement, ReactEventHandler, ReactNode } from "react";
import ReactTable from "react-table";

export declare type Request = {
    _id: string,
    user: string,
    fileId: string,
    resource: string,
    comment: string,
    status: string
};

export declare type Policy = {
    _id: string,
    dacId: string,
    fileId: string,
    acl: string,
    policy: string
};

export declare type Labels = {
    user: string,
    fileId: string,
    resource: string,
    comment: string,
    access: string,
    status: string,
    dacId: string,
    policy: string
};

export type Handlers = {
    putItem: React.MouseEventHandler<HTMLButtonElement>
    deleteItem: React.MouseEventHandler<HTMLButtonElement>
    saveItem: React.MouseEventHandler<HTMLButtonElement>
    changeItem: (React.ChangeEventHandler<HTMLInputElement>)
}

export interface ITableProps {
    allRows: Array<Request | Policy>,
    labels: Partial<Labels>,
    exclude?: Array<string>,
    putItem?: (row: Request | Policy, index: number) => void,
    deleteItem?: (row: Request | Policy, index: number) => void,
    saveItem?: (row: Request | Policy) => void,
    changeItem?: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export interface ITableRowProps {
    row: Request | Policy,
    index: number,
    change?: React.ChangeEvent<HTMLInputElement>,
    edit?: ITableCell,
    exclude?: Array<string>,
    children?: ReactElement
};
  
export interface ITableRowPropsWithButtons {
    row: Request | Policy,
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