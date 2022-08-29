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

export declare type Permission = {
    sub: string,
    type: string,
    value: string,
    source: string,
    by: string,
    asserted: number
};

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
    allRows: Array<Request | Policy | Permission>,
    labels: Partial<Labels>,
    exclude?: Array<string>,
    putItem?: (row: Request | Policy | Permission, index: number) => void,
    deleteItem?: (row: Request | Policy | Permission, index: number) => void,
    saveItem?: (row: Request | Policy | Permission) => void,
    changeItem?: (e: React.ChangeEvent<HTMLInputElement>) => void
};

export interface ITableRowProps {
    row: Request | Policy | Permission,
    index: number,
    change?: React.ChangeEvent<HTMLInputElement>,
    edit?: ITableCell,
    exclude?: Array<string>,
    children?: ReactElement
};
  
export interface ITableRowPropsWithButtons {
    row: Request | Policy | Permission,
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