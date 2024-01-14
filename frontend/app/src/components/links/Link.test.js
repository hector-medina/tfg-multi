import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Link from './Link';

describe('Link', () => {
  it('renders correctly with default props', () => {
    const { getByText } = render(<Link onPressed={() => {}}>Test Link</Link>);

    expect(getByText('Test Link')).toBeTruthy();
  });

  it('calls onPress handler when clicked', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Link onPressed={onPressMock}>Clickable Link</Link>);

    const link = getByText('Clickable Link');
    fireEvent(link, 'press');

    expect(onPressMock).toHaveBeenCalled();
  });

  it('applies styles correctly from theme', () => {
    const { getByText } = render(<Link onPressed={() => {}}>Styled Link</Link>);

    const link = getByText('Styled Link');
    const textStyle = link.props.style;

    expect(textStyle.color).toEqual('#4BC29C');
    expect(textStyle.fontSize).toEqual(16);
    expect(textStyle.fontWeight).toEqual('bold');
    expect(textStyle.alignSelf).toEqual('center');
  });
});