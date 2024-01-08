import { fireEvent, render, screen } from '@testing-library/react';
import CustomList from './CustomList';

describe('CustomList', () => {
  test('Given CustomList when its mount with no data then list is empty', () => {
    useAppSelectorSpy.mockImplementation((callback) => callback({ common: { message: '' } }));
    render(<CustomList datas={[]} />);
    expect(screen.getByTestId('MdList')).toBeDefined();
  });

  test('Given CustomList when its mount with datas then list not empty', () => {
    const callback = jest.fn();
    const callbackCheckbox = jest.fn();
    const callbackDelete = jest.fn();
    useAppSelectorSpy.mockImplementation((callback) => callback({ common: { message: 'test' } }));
    render(
      <CustomList
        datas={[{ id: 1, avatar: 'avatar', chip: 'chip', name: 'name', icon: 'icon', checked: true }]}
        callback={callback}
        callbackCheckbox={callbackCheckbox}
        callbackDelete={callbackDelete}
      />,
    );
    expect(screen.getByTestId('MdList')).toBeDefined();
    fireEvent.click(screen.getAllByTestId('MdListItem')[0]);
    expect(callback).toBeCalled();
    fireEvent.click(screen.getByTestId('MdFormCheckboxSimple'));
    expect(callbackCheckbox).toBeCalled();
  });
});
