import { render } from '@testing-library/react';
import CrudPage from './CrudPage';

describe('CrudPage', () => {
  test('Given CrudPage when its mount then ButtonGroup is shown', () => {
    const { container } = render(<CrudPage className='className'>Content</CrudPage>);
    expect(container.getElementsByClassName('main-container')[0]).toBeDefined();
  });
});
