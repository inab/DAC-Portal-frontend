import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { act } from '@testing-library/react-hooks';
import RequestsRevision from '../../Infrastructure/Views/Pages/RequestsRevision';
import { getUserRequests } from '../../Application/UseCases/ManageRequestsRevision';
import { prettyDOM } from '@testing-library/dom';

let mockItems = [{
    fileId: "003",
    resource: "nc:172.21.0.1:7080:003",
    comment: "i need access",
    status: "Accepted"
}]

// Mocking ManageRequestsRevision Service module
jest.mock("../../Application/UseCases/ManageRequestsRevision");

describe("Requests revision page", () => {
    test('Requests are initially loaded', async () => {
        let component;

        getUserRequests.mockResolvedValueOnce(mockItems);

        await act(async () => {
            component = render(<RequestsRevision />)
        })

        expect(component.container).toHaveTextContent("Accepted");
    })
    test('If there are no requests then the Table is not rendered', async () => {
        let component;

        getUserRequests.mockResolvedValueOnce([]);

        await act(async () => {
            component = render(<RequestsRevision />)
        })

        expect(component.queryByText('Accepted')).not.toBeInTheDocument()

        expect(component.container).toHaveTextContent("No requests have been made");
    })
})

