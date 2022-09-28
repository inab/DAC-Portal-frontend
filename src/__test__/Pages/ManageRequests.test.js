import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import RequestsRevision from '../../Infrastructure/Views/Pages/ManageRequests';
import { getPendingUserRequests, acceptUserRequest } from '../../Application/UseCases/ManageRequests';
import { prettyDOM } from '@testing-library/dom'
//import Table from '../../components/Table/TableContainer';

let mockItems = [
    {
        _id: "test_object_id_1",
        user: "b9716083-b4c9-48f3-aae1-db81190aae81",
        fileId: "003",
        resource: "nc:172.21.0.1:7080:003",
        comment: "I need access",
        status: "Pending"
    },
    {
        _id: "test_object_id_2",
        user: "b9716083-b4c9-48f3-aae1-db81190aae81",
        fileId: "004",
        resource: "nc:172.21.0.1:7080:004",
        comment: "Please, would you give me access to this dataset too?",
        status: "Pending"
    }
]

let mockAfterClickingItems = [
    {
        _id: "test_object_id_2",
        user: "b9716083-b4c9-48f3-aae1-db81190aae81",
        fileId: "004",
        resource: "nc:172.21.0.1:7080:004",
        comment: "Please, would you give me access to this dataset too?",
        status: "Pending"
    }
]

// Mocking ManageRequestsRevision Service module
jest.mock("../../Application/UseCases/ManageRequests");

describe("Manage requests page", () => {
    test('Requests are initially loaded (2 requests)', async () => {
        let component;

        getPendingUserRequests.mockResolvedValueOnce(mockItems);

        await act(async () => {
            component = render(<RequestsRevision />)
        })

        expect(component.queryByText("nc:172.21.0.1:7080:003")).toBeInTheDocument()
        expect(component.queryByText("nc:172.21.0.1:7080:004")).toBeInTheDocument()
    })
    test('Status and _id values are excluded from table', async () => {
        let component;

        getPendingUserRequests.mockResolvedValueOnce(mockItems);

        await act(async () => {
            component = render(<RequestsRevision />)
        })

        expect(component.queryByText("test_object_id_1")).not.toBeInTheDocument()
        expect(component.queryByText("test_object_id_2")).not.toBeInTheDocument()
        expect(component.queryByText("Pending")).not.toBeInTheDocument()

        // Here we just check that other columns are effectively rendered
        expect(component.queryByText("I need access")).toBeInTheDocument()
        expect(component.queryByText("004")).toBeInTheDocument()
    })
    test('Table rows have two buttons each', async () => {
        let component;

        getPendingUserRequests.mockResolvedValueOnce(mockItems);

        await act(async () => {
            component = render(<RequestsRevision />)
        })

        // We take one of the "Grant" buttons" and check they can fire events ()
        const grantButtons = component.getAllByText("Grant")
        const denyButtons = component.getAllByText("Deny")

        expect(grantButtons.length).toBe(2)
        expect(denyButtons.length).toBe(2)
    })
    test('After accepting a request by clicking the "Grant" button, the row is removed from table', async () => {
        let component;

        // We mock the ManageRequests Service (getPendingUserRequests & acceptUsersRequests methods)
        getPendingUserRequests.mockResolvedValueOnce(mockItems);
        acceptUserRequest.mockResolvedValueOnce(mockAfterClickingItems);

        await act(async () => {
            component = render(<RequestsRevision />)
        })

        // We first check that we have two rows (items (state): Array<UserRequest> -> mockItems)
        const grantButtons = component.getAllByText("Grant")
        const denyButtons = component.getAllByText("Deny")

        expect(grantButtons.length).toBe(2)
        expect(denyButtons.length).toBe(2)

        // We accept a request by clicking the "Grant" button for one of the rows.
        await act(async () => {
            fireEvent.click(grantButtons[0])
        })
        
        const grantButtonsAfterClicking = component.getAllByText("Grant")
        const denyButtonsAfterClicking = component.getAllByText("Deny")

        // We check that the row is removed from table -> Click event updates the state correctly (items = items-1).
        expect(grantButtonsAfterClicking.length).toBe(1)
        expect(denyButtonsAfterClicking.length).toBe(1)        
    })
    test('If there are no requests the Table is not rendered', async () => {
        let component;

        getPendingUserRequests.mockResolvedValueOnce([]);

        await act(async () => {
            component = render(<RequestsRevision />)
        })

        expect(component.queryByText("nc:172.21.0.1:7080:003")).not.toBeInTheDocument()
        expect(component.queryByText("nc:172.21.0.1:7080:004")).not.toBeInTheDocument()

        expect(component.container).toHaveTextContent("No requests have been made to your DAC");
    })
})

