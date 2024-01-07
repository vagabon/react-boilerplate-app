import { render, screen } from '@testing-library/react';
import CustomModaleConfirm from './CustomModaleConfirm';

describe('CustomModaleConfirm', () => {
  test('Given CustomModaleConfirm when its mount with no data then list is empty', () => {
    const mockCallback = jest.fn();
    render(
      <CustomModaleConfirm id='1' label='label' icon='icon' button='button' callback={mockCallback}>
        {() => <></>}
      </CustomModaleConfirm>,
    );
    expect(screen.getByTestId('MdCommonModal')).toBeDefined();
  });
});
