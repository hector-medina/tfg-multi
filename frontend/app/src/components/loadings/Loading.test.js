import React from 'react';
import { render } from '@testing-library/react-native';
import Loading from './Loading';
import theme from "../../theme";

describe('Loading', () => {
  it('renders correctly with default props', () => {
    const { getByText, getByTestId } = render(<Loading />);

    expect(getByTestId('activity-indicator')).toBeTruthy();

    expect(() => getByText('Title')).toThrow();
    expect(() => getByText('Message')).toThrow();
  });

  it('renders correctly with title and message', () => {
    const { getByText } = render(<Loading title="Loading..." message="Please wait" />);

    expect(getByText('Loading...')).toBeTruthy();
    expect(getByText('Please wait')).toBeTruthy();
  });

  it('applies styles correctly', () => {
    const { getByTestId } = render(<Loading />);

    const container = getByTestId('loading-container');
    const card = container.children[0];

    expect(container.props.style.backgroundColor).toEqual('rgba(0,0,0,0.5)');
    expect(container.props.style.justifyContent).toEqual('center');
    expect(container.props.style.alignItems).toEqual('center');
    expect(container.props.style.flex).toEqual(1);

    expect(card.props.style[0]).toEqual(theme.components.Card.style);
  });

  it('renders correctly when modalVisible is false', () => {
    const { queryByTestId } = render(<Loading modalVisible={false} />);

    expect(queryByTestId('loading-container')).toBeNull();
  });
});