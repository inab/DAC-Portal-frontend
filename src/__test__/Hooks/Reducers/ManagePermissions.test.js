import '@testing-library/jest-dom/extend-expect';
import { act, renderHook } from '@testing-library/react-hooks';
import { useRequest } from '../../../Infrastructure/Adapters/Store/Dispatchers/ManagePermissions';
//import { prettyDOM } from '@testing-library/dom'

const mockRequest = {
    sub: "testUID",
    value: "testDatasetID",
    index: 0
}

test('Permissions reducer updates the state. type=delete ', () => {
    const { result } = renderHook(() => useRequest())

    const [state, { deleteItem }] = result.current

    act(() => {
        deleteItem(mockRequest, mockRequest.index)
    }) 

    expect(result.current[0].params.values).toBe("testDatasetID")

})