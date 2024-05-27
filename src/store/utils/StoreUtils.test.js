import { deepEqual } from './StoreUtils';

describe('deepEqual', () => {
  test('Given deepEqual When data are the same Then return is true', async () => {
    let tested = deepEqual([{ id: 1 }], [{ id: 1 }]);
    expect(tested).toBe(true);

    tested = deepEqual([{ id: 1 }], [{ id: '1' }]);
    expect(tested).toBe(false);

    tested = deepEqual([{ id: 1 }], { id: 1 });
    expect(tested).toBe(false);

    tested = deepEqual('[{ id: 1 },],', '{id: 1');
    expect(tested).toBe(false);
  });
});
