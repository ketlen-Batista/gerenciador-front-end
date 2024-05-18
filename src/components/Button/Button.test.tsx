import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import MockThemeProvider from '@/tests/MockThemeProvider';
import Button from './index';

describe('components/atoms/Button', () => {
  it('Checking buttons variant', () => {
    const toRender = render(
      <MockThemeProvider>
        <Button variant="contained" dataTestId="p-button">
          Simple primary button
        </Button>
        <Button variant="outlined" dataTestId="s-button">
          Simple secondary button
        </Button>
        <Button disabled dataTestId="d-button">
          Simple disabled button
        </Button>
      </MockThemeProvider>,
    );
    expect(toRender.baseElement).toBeInTheDocument();

    const primaryButton = screen.getByTestId('p-button');
    const secondaryButton = screen.getByTestId('s-button');

    expect(primaryButton).toBeInTheDocument();
    expect(secondaryButton).toBeInTheDocument();
  });

  it('Call onClick button props', () => {
    const handleEnabledClick = jest.fn();
    const handleDisabledClick = jest.fn();
    const toRender = render(
      <MockThemeProvider>
        <Button dataTestId="p-button" onClick={handleEnabledClick}>
          Simple primary button
        </Button>
        <Button disabled dataTestId="d-button" onClick={handleDisabledClick}>
          Simple disabled button
        </Button>
      </MockThemeProvider>,
    );
    expect(toRender.baseElement).toBeInTheDocument();

    const primaryButton = screen.getByTestId('p-button');
    const disabledButton = screen.getByTestId('d-button');

    expect(primaryButton).toBeInTheDocument();
    expect(disabledButton).toBeInTheDocument();

    fireEvent.click(primaryButton);
    expect(handleEnabledClick).toHaveBeenCalled();

    fireEvent.click(disabledButton);
    expect(handleDisabledClick).not.toHaveBeenCalled();
  });
});
