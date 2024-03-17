import { NotificationUtils } from './NotificationUtils';

describe('NotificationUtils', () => {
  test('Given NotificationUtils When convertToCustomList Then custom list is return', async () => {
    NotificationUtils.convertToCustomList([{}]);
    const icons = [
      { value: 'REWARD', expected: 'gift' },
      { value: 'CREATOR', expected: 'camera' },
      { value: 'LINK', expected: 'link' },
      { value: 'LINK_ACTIVE', expected: 'link' },
      { value: 'MEMBER', expected: 'account' },
      { value: 'IMPORT', expected: 'dashboard' },
      { value: '', expected: 'info' },
    ];
    icons.forEach((icon) => {
      const tested = NotificationUtils.getIcon(icon.value);
      expect(tested).toBe(icon.expected);
    });
  });
});
