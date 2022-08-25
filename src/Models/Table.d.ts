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

export interface ITableProps {
    allRows: Array<Request | Policy>,
    labels: Partial<Labels>,
    exclude?: Array<string>,
    putItem?: ReactElement | Null,
    deleteItem?: ReactElement | Null,
    saveItem?: ReactElement | Null,
    changeItem?: ReactElement | Null
};
  
export interface ITableRowProps {
    row: Request | Policy,
    index: number,
    change?: React.ChangeEvent<HTMLInputElement> | Null,
    edit?: ITableCell,
    exclude?: Array<string>,
    children?: ReactElement
};
  
export interface ITableRowPropsWithButtons {
    row: Request | Policy,
    index: number,
    exclude?: Array<string>,
    putItem?: React.MouseEventHandler<HTMLButtonElement> | Null,
    deleteItem?: React.MouseEventHandler<HTMLButtonElement> | Null,
    saveItem?: React.MouseEventHandler<HTMLButtonElement> | Null,
    changeItem?: React.ChangeEvent<HTMLInputElement> | Null
};

export interface ITableCell {
    editable: boolean,
    column: string,
    change: React.ChangeEvent<HTMLInputElement> | Null
};