import AuthReducers, { LoginAction } from './AuthReducers';

const state = {
  isLoggedIn: false,
  user: null,
};

describe('AuthReducers', () => {
  test('Given AuthReducers when setLoginSuccess then state is merged', () => {
    const datas = { user: { id: 1 } };
    const tested = AuthReducers(state, LoginAction.setLoginSuccess(datas));
    expect(tested.user.user.id).toBe(1);
  });

  test('Given AuthReducers when setLoginSuccess then state is merged', () => {
    const tested = AuthReducers(state, LoginAction.setLoginError());
    expect(tested.user).toBe(null);
  });
});
