import { fireEvent, render, screen } from '@testing-library/react';
import { ApiService } from '../../../../api/service/ApiService';
import CustomFormSelect from './CustomFormSelect';

describe('CustomFormSelect', () => {
  test('Given CustomFormSelect when its mount then ', () => {
    const conf = {
      listEndPoint: 'listEndPoint',
      listName: 'name',
    };
    spyOn(ApiService, 'get', { content: [{ id: 1, name: 'name' }] });
    render(<CustomFormSelect conf={conf} label='label' name='name' listId={true} />);
    fireEvent.click(screen.getByTestId('MdFormSelect'));
  });
});
