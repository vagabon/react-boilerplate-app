import { fireEvent, render, screen } from '@testing-library/react';
import { AppInputWithButton } from './AppInputWithButton';

describe('AppInputWithButton', () => {
  test('Given AppInputWithButton When its mount Then MdInputTextSimple is shown', () => {
    const callback = jest.fn();
    render(<AppInputWithButton localeIfEmpty='localeIfEmpty' callback={callback} />);
    expect(screen.findByTestId('MdInputTextSimple')).toBeDefined();
    fireEvent.click(screen.getByTestId('MdButton'));
    fireEvent.blur(screen.getByTestId('MdInputTextSimple'), { target: { name: 'name', value: 'test' } });
    fireEvent.keyUp(screen.getByTestId('MdInputTextSimple'), { target: { name: 'name', value: 'test' } });
    expect(callback).toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('MdButton'));
    expect(callback).toHaveBeenCalled();
  });
});
