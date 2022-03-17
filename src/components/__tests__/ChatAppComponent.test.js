import React from 'react';
import renderer from 'react-test-renderer';
import ChatAppMessages from '../__fixtures__/ChatAppMessages';
import { user1 } from '../__fixtures__/Users';

import ChatAppComponent from '../ChatAppComponent';





describe('<ChatAppComponenet />', () => {


    it('should match snapshot', () => {
        const tree = renderer.create(<ChatAppComponent messages={ChatAppMessages} user={user1} />);

        expect(tree.toJSON()).toMatchSnapshot();
    });

});