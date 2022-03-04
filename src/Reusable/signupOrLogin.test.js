import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';


import SignUpOrLogin from './SignUpOrLogin';

describe('SignUpOrLogin', () => {
  it('should render the signorlogin', () => {
    const mockFn = jest.fn();

    render(<SignUpOrLogin handleLogin={mockFn} accountText={'Account Text'} buttonText={'Button Text'} />);

    const AccountText = screen.getByText('Account Text');
    const ButtonText = screen.getByText('Button Text');

    expect(AccountText).toBeInTheDocument();
    expect(ButtonText).toBeInTheDocument();

    fireEvent.click(ButtonText);
    expect(mockFn).toHaveBeenCalledTimes(1)
  });
});