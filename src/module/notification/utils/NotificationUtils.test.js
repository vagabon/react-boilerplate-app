import { NotificationUtils } from './NotificationUtils';

describe('NotificationUtils', () => {
  test('Given NotificationUtils When convertToCustomList Then custom list is return', async () => {
    const mock = (data) => data;
    NotificationUtils.convertToCustomList([{}], mock);
  });
});
