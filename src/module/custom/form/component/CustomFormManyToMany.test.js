import { fireEvent, render, screen } from '@testing-library/react';
import CustomFormManyToMany from './CustomFormManyToMany';

jest.mock('./CustomFormModale', () => ({ handleClose, handleSelect }) => (
  <>
    <input name='handleClose' onClick={handleClose([{ id: 2, name: 'name2' }])} />
    <input name='handleSelect' onClick={handleSelect([{ id: 2, name: 'name2' }])} />
  </>
));

const PROFILE_M2M = {
  name: 'name',
  endPoint: 'profile',
  fields: 'name%',
  order: 'name',
  orderBy: 'asc',
};

describe('CustomFormManyToMany', () => {
  test('Given CustomFormManyToMany when its mount then ', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        common: { history: {} },
      }),
    );
    const conf = {
      profiles: {
        label: 'AUTH:FIELDS.PFOFILES',
        type: 'm2m',
        required: true,
        m2m: PROFILE_M2M,
        array: true,
      },
    };
    const setFieldValue = jest.fn();
    const { container } = render(
      <CustomFormManyToMany
        conf={conf}
        label='AUTH:FIELDS.PFOFILES'
        name='profiles'
        validationSchema={conf}
        errors={[]}
        values={{ profiles: [{ id: 1, name: 'name' }] }}
        setFieldValue={setFieldValue}
      />,
    );
    expect(screen.getAllByText(/AUTH:FIELDS.PFOFILES/)[0]).toBeDefined();
    fireEvent.click(screen.getAllByTestId('MdChip')[0]);
    expect(setFieldValue).toBeCalled();
    fireEvent.click(screen.getAllByTestId('MdButton')[0]);
    fireEvent.click(container.querySelector(`input[name="handleClose"]`));
    fireEvent.click(container.querySelector(`input[name="handleSelect"]`));
  });
});
