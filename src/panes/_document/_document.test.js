/* enzyme */
import { shallow, } from 'enzyme';

/* components */
import Document from '../../../pages/_document';

describe('Document rendering test', () => {
    it('renders without exploding', () => {
        const wrapper = shallow(<Document />);
    });
});