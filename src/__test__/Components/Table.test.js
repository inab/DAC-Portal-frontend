import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Table from '../../Infrastructure/Views/Components/Table/TableContainer';
import { DisplayRow } from '../../Infrastructure/Views/Components/Table/TableRow';

const mockData = [
    {
        comment: "Hi there",
        fileId: "003",
        resource: "nc:172.21.0.1:7080:003",
        status: "Accepted"
    },
    {
        comment: "Please, give me access to this dataset",
        fileId: "004",
        resource: "nc:172.21.0.1:7080:004",
        status: "Pending"
    }
]

const TABLE_LABELS = {
    fileId: "File ID",
    resource: "Resource",
    comment: "Comment",
    status: "Status"
}

describe("Unit tests: Table component ->", () => {

    test('renders a table without buttons, that has all the columns and row data', () => {
        const component = render(<Table allRows={mockData} labels={TABLE_LABELS}/>)
        // Renders columns with the proper labels
        component.getByText("File ID")
        component.getByText("Resource")
        component.getByText("Comment")
        component.getByText("Status")
        // Renders data correctly (two rows) and values (column example 'comments' field)
        component.getByText("Hi there")
        component.getByText("Please, give me access to this dataset")
    })
    
    test('renders a table without buttons, that excludes values of specific columns', () => {
        const component = render(<Table allRows={mockData} labels={TABLE_LABELS} exclude={["comment"]}/>)
        // Check first that we render some row data
        component.getByText("nc:172.21.0.1:7080:004")
        // Here we check that the comment data is not displayed (exclude prop)
        expect(component.queryByText('Please, give me access to this dataset')).not.toBeInTheDocument()
        expect(component.queryByText('Hi there')).not.toBeInTheDocument()
    })
    
    test('renders a table with buttons, and they can be clicked', () => {
        const mockPutItem = jest.fn()
        const mockDeleteItem = jest.fn()
    
        const component = render(
            <Table 
                allRows={mockData} 
                labels={TABLE_LABELS}
                putItem={mockPutItem}
                deleteItem={mockDeleteItem}  />)
        
        // Component is rendered -> Two buttons for each row
        const putButton = component.getAllByText("Grant")
        const deleteButton = component.getAllByText("Deny")
        // We click on the buttons and an event is fired.
        fireEvent.click(putButton[0])
        fireEvent.click(deleteButton[1])
        expect(mockPutItem).toHaveBeenCalledTimes(1)
        expect(mockDeleteItem).toHaveBeenCalledTimes(1)
    })
    
    test('renders a table with buttons, one of the with editable === true', () => {
        const mockChangeItem = jest.fn()
        const mockSaveItem = jest.fn()
    
        const component = render(
            <Table 
                allRows={mockData} 
                labels={TABLE_LABELS}
                changeItem={mockChangeItem}
                saveItem={mockSaveItem}  />)
        
        // Component is rendered -> Two buttons for each row, including "Edit" button
        component.getAllByText("Edit")
        component.getAllByText("Confirm")
    
    })
    
    test('renders a table with buttons, just one per row - no putItem or changeItem handlers', () => {
        const mockDeleteItem = jest.fn()
    
        const component = render(
            <Table 
                allRows={mockData} 
                labels={TABLE_LABELS}
                deleteItem={mockDeleteItem} />)
        
        // Component renders a table with one "Revoke" button per row
        const deleteButton = component.getAllByText("Revoke")
        fireEvent.click(deleteButton[1])
        expect(mockDeleteItem).toHaveBeenCalledTimes(1)
    
        // Also, we check there is not other button type
        expect(component.queryByText('Edit')).not.toBeInTheDocument()
        expect(component.queryByText('Confirm')).not.toBeInTheDocument()
        expect(component.queryByText('Grant')).not.toBeInTheDocument()
        expect(component.queryByText('Deny')).not.toBeInTheDocument()
    })
    
    test('renders a table with buttons, editable ', () => {
        const mockHandler = jest.fn()
        
        const mockEditObject = {
            editable: true,
            column: "comment",
            change: mockHandler
        }
    
        // We display only one row.
        const component = render(
            <DisplayRow 
                row={mockData[0]} 
                index={0} 
                edit={mockEditObject} />)
        
        // Component renders a row with an input element
        const input = component.container.querySelector("input")
    })
})
