import { fireEvent, render, screen } from '@testing-library/react';
import { AdminService } from '../../../admin/service/AdminService';
import { CustomFormModale } from './CustomFormModale';

const PROFILE_M2M = {
  name: 'name',
  endPoint: 'profile',
  fields: 'name%',
  order: 'name',
  orderBy: 'asc',
};

describe('CustomFormModale', () => {
  test('Given CustomFormModale when its mount then ', () => {
    spyOn(AdminService, 'findBy', { content: [] });
    render(<CustomFormModale open={true} />);
    fireEvent.click(screen.getByTestId('MdSearchBar'));
  });

  test('Given CustomFormModale when its mount with data then ', async () => {
    spyOn(AdminService, 'findBy', { content: [{ id: 1 }] });
    await render(<CustomFormModale conf={PROFILE_M2M} open={true} handleSelect={() => {}} />);
    fireEvent.click(screen.getByTestId('MdSearchBar'));
  });
});
