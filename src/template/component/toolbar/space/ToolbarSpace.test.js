import { render, screen } from '@testing-library/react';
import { ToolbarSpace } from './ToolbarSpace';

describe('ToolbarSpace', () => {
  test('renders ToolbarSpace', () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        auth: { isLoggedIn: true },
        common: { drawer: { force: true } },
      }),
    );
    render(<ToolbarSpace></ToolbarSpace>);
    expect(screen.getByTestId('MdTypo')).toBeDefined();
  });
});
