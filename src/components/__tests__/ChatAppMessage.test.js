import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';


import ChatAppMessage from '../ChatAppMessage';
import ChatAppMessages from '../__fixtures__/ChatAppMessages';
import { user1 } from '../__fixtures__/Users';




const renderComponent = (messageObj, userObj) => {


    const helpers = render(<ChatAppMessage messageObj={messageObj} userObj={userObj} />);

    return { ...helpers };
}




describe('<ChatAppMessage />', () => {
    describe('Given a list of ChatAppMessages and user1', () => {
        it.each(ChatAppMessages)('should render all messages with correct information', (chatAppMessage) => {

            renderComponent(chatAppMessage, user1);

            expect(screen.getByText(chatAppMessage.message)).toBeInTheDocument();
            expect(screen.getByText(chatAppMessage.user.username)).toContainHTML(`<strong>${chatAppMessage.user.username}</strong>`);
        });
    });
});











