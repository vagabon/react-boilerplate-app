import { AdminAction, AdminReducers } from './AdminReducer';

const state = {
  user: {
    table: { page: 0 },
  },
};

describe('AdminReducer', () => {
  test('Given AdminReducer when setState then state is merged', () => {
    const datas = { activePage: 'user', newState: { data: { id: 1 } } };
    const tested = AdminReducers(state, AdminAction.setState(datas));
    expect(tested.user.data.id).toBe(1);
  });

  test('Given AdminReducer when setDatas then state is merged', () => {
    const datas = { activePage: 'user', datas: [{ id: 1 }] };
    const tested = AdminReducers(state, AdminAction.setDatas(datas));
    expect(tested.user.datas[0].id).toBe(1);
  });

  test('Given AdminReducer when setCount then state is merged', () => {
    const datas = { activePage: 'user', count: 1 };
    const tested = AdminReducers(state, AdminAction.setCount(datas));
    expect(tested.user.count).toBe(1);
  });

  test('Given AdminReducer when setData then state is merged', () => {
    const datas = { activePage: 'user', data: { id: 1 } };
    const tested = AdminReducers(state, AdminAction.setData(datas));
    expect(tested.user.data.id).toBe(1);
  });

  test('Given AdminReducer when setFilter then state is merged', () => {
    const datas = { activePage: 'user', filter: { id: 1 } };
    const tested = AdminReducers(state, AdminAction.setFilter(datas));
    expect(tested.user.filter.id).toBe(1);
  });

  test('Given AdminReducer when setPage then state is merged', () => {
    const datas = { activePage: 'user', table: { page: 1 } };
    const tested = AdminReducers(state, AdminAction.setPage(datas));
    expect(tested.user.table.page).toBe(1);
  });
});
