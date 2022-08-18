export declare type Request = {
    _id: string,
    user: string,
    fileId: string,
    resource: string,
    comment: string,
    status: string
};

export declare type Labels = {
    user?: string,
    fileId: string,
    resource: string,
    comment: string,
    access?: string,
    status?: string
};

export interface ITableProps {
    allRows: Array<Request>,
    labels: Labels,
    exclude?: Array<string>,
    putItem?: ReactElement,
    deleteItem?: ReactElement
};
  
export interface ITableRowProps {
    row: Request,
    exclude?: Array<string>,
    children?: ReactElement
};
  
export interface ITableRowPropsWithButtons {
    row: Request,
    exclude?: Array<string>,
    putItem?: React.MouseEventHandler<HTMLButtonElement>,
    deleteItem?: React.MouseEventHandler<HTMLButtonElement>
};