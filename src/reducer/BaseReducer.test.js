import { ReducersActions } from './BaseReducer';

const state = {
  datas: [{ id: '1', name: 'name' }],
  data: {},
  count: 0,
  search: '',
  page: 2,
};

describe('BASE REDUCER', () => {
  test('Given ReducersActions When setDatas Then datas from state are update', () => {
    const datas = [{ name: 'name' }];
    const tested = ReducersActions.setDatas(state, { payload: datas });
    expect(tested.datas).toStrictEqual(datas);
  });

  test('Given ReducersActions When addDatas Then datas from state are update', () => {
    const datas = [{ name: 'name' }];
    const tested = ReducersActions.addDatas(state, { payload: datas });
    expect(tested.datas).toStrictEqual([{ id: '1', name: 'name' }, { name: 'name' }]);
  });

  test('Given ReducersActions When updataDatas with another id Then datas from state are not update', () => {
    const data = { id: '2', name: 'name2' };
    const tested = ReducersActions.updataDatas(state, { payload: data });
    expect(tested.datas).toStrictEqual([{ id: '1', name: 'name' }]);
  });

  test('Given ReducersActions When updataDatas Then datas from state are update', () => {
    const data = { id: '1', name: 'name2' };
    const tested = ReducersActions.updataDatas(state, { payload: data });
    expect(tested.datas).toStrictEqual([data]);
  });

  test('Given ReducersActions When setData Then data from state is update', () => {
    const data = { name: 'name' };
    const tested = ReducersActions.setData(state, { payload: data });
    expect(tested.data).toBe(data);
  });

  test('Given ReducersActions When setCount Then count from state is update', () => {
    const tested = ReducersActions.setCount(state, { payload: 12 });
    expect(tested.count).toBe(12);
  });

  test('Given ReducersActions When setSearch Then search from state is update', () => {
    const tested = ReducersActions.setSearch(state, { payload: 'test' });
    expect(tested.search).toBe('test');
  });

  test('Given ReducersActions When setPage Then datas from state is equals to datas', () => {
    const tested = ReducersActions.setPage(state, { payload: 1 });
    expect(tested.page).toBe(1);
  });
});
