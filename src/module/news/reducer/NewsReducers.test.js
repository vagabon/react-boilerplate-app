import NewsReducers, { NewsAction } from './NewsReducers';

const state = {
  isLoggedIn: false,
  user: null,
};

describe('NewsReducers', () => {
  test('Given NewsReducers when setLoginSuccess then state is merged', () => {
    const datas = [{ id: 1 }];
    const tested = NewsReducers(state, NewsAction.setDatas(datas));
    expect(tested.datas[0].id).toBe(1);
  });
});
