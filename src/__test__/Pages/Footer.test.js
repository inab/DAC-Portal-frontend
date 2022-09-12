import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Footer from '../../components/Footer/Footer';

test('renders content', () => {
    const component = render(<Footer/>)
    component.getByText("Project page")
})