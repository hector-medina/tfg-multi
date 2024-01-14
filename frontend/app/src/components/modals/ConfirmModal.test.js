import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ConfirmModal from './ConfirmModal';
import theme from "../../theme";

describe('ConfirmModal', () => {
  it('renders correctly with default props', () => {
    const { getByText, getByTestId } = render(<ConfirmModal entity="Item" />);

    expect(getByTestId('confirm-modal')).toBeTruthy();

    expect(getByText('Warning!')).toBeTruthy();
    expect(getByText('You are about to delete the Item. Are you sure?')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Confirm')).toBeTruthy();
  });

  it('calls onCancel and onConfirm handlers when buttons are clicked', () => {
    const onCancelMock = jest.fn();
    const onConfirmMock = jest.fn();
    const { getByText } = render(
      <ConfirmModal entity="Item" onCancel={onCancelMock} onConfirm={onConfirmMock} />
    );

    const cancelButton = getByText('Cancel');
    const confirmButton = getByText('Confirm');

    fireEvent.press(cancelButton);
    fireEvent.press(confirmButton);

    expect(onCancelMock).toHaveBeenCalled();
    expect(onConfirmMock).toHaveBeenCalled();
  });

  it('applies styles correctly', () => {
    const { getByTestId } = render(<ConfirmModal entity="Item" />);

    const container = getByTestId('confirm-modal');
    const card = container.children[0];

    expect(container.props.style).toEqual({
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    });

    expect(card.props.style[0]).toEqual(theme.components.Card.style);
  });

  it('renders correctly when modalVisible is false', () => {
    const { queryByTestId } = render(<ConfirmModal entity="Item" modalVisible={false} />);

    expect(queryByTestId('confirm-modal')).toBeNull();
  });
});
