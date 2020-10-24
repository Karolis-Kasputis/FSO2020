import React from 'react';
import SignIn from '../../components/SignIn';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import { SignInFormContainer } from '../../components/SignIn';
describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // render the SignInContainer component, fill the text inputs and press the submit button
      const onSubmit = jest.fn();

      const { debug, getByText, getByPlaceholderText } = render(
        <SignInFormContainer onSubmit={onSubmit} />
      );

      const username = getByPlaceholderText('username');
      const password = getByPlaceholderText('password');
      const signInButton = getByText('Sign in');
      await waitFor(async () => {
        await fireEvent.changeText(username, 'kalle');
        await fireEvent.changeText(password, 'password');
        await act(async () => {
          await fireEvent.press(signInButton);
        });
      });
      console.log('onsubmit.', onSubmit.mock.calls);

      // expect the onSubmit function to have been called once and with a correct first argument
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0].username).toBe('kalle');
      expect(onSubmit.mock.calls[0][0].password).toBe('password');
    });
  });
});
