import { CommonAction, CommonReducers } from './CommonReducers';

const state = {
  message: '',
  type: 'success',
  loading: false,
  history: [],
};

describe('CommonReducer', () => {
  test('Given CommonReducer When setMessage Then message from state is update', () => {
    const data = {
      message: 'test',
      type: 'error',
    };
    const tested = CommonReducers(state, CommonAction.setMessage(data));
    expect(tested.message).toStrictEqual({ message: 'test', type: 'error' });
    expect(tested.message.type).toBe('error');
  });

  test('Given CommonReducer When clearMessage Then message from state is empty', () => {
    const tested = CommonReducers(state, CommonAction.clearMessage());
    expect(tested.message).toStrictEqual({ id: '', message: '', type: 'success' });
  });

  test('Given CommonReducer When setLoading Then loading from state is update', () => {
    const tested = CommonReducers(state, CommonAction.setLoading(true));
    expect(tested.loading).toBe(true);
  });

  test('Given CommonReducer When setHistory Then history from state is update', () => {
    const tested = CommonReducers(state, CommonAction.setHistory([{ name: 'name' }]));
    expect(tested.history).toStrictEqual([{ name: 'name' }]);
  });

  test('Given CommonReducer When addHistory Then history from state is update', () => {
    const history = { id: '1', title: 'title', link: 'link' };
    const tested = CommonReducers(state, CommonAction.addHistory(history));
    expect(tested.history).toHaveLength(2);
  });

  test('Given CommonReducer When addHistory Then history from state is update', () => {
    const history = { id: '1', title: 'title', link: '/' };
    const tested = CommonReducers(state, CommonAction.addHistory(history));
    expect(tested.history).toHaveLength(1);
  });

  test('Given CommonReducer When addHistory with existing title in history Then history from state is update', () => {
    state.history = [
      { id: '1', title: 'title', link: 'link' },
      { id: '2', title: 'title2', link: 'link' },
      { id: '3', title: 'title3', link: 'link' },
      { id: '4', title: 'title4', link: 'link' },
    ];
    const history = { id: '5', title: 'title2', link: 'link' };
    const tested = CommonReducers(state, CommonAction.addHistory(history));
    expect(tested.history).toHaveLength(1);
  });

  test('Given CommonReducer When sliceHistoryOnce Then history from state is update', () => {
    state.history = [
      { id: '1', title: 'title', link: 'link' },
      { id: '2', title: 'title2', link: 'link' },
    ];
    const tested = CommonReducers(state, CommonAction.sliceHistoryOnce(history));
    expect(tested.history).toHaveLength(1);
  });

  test('Given CommonReducer When sliceHistory Then history from state is update', () => {
    state.history = [
      { id: '1', title: 'title', link: 'link' },
      { id: '2', title: 'title2', link: 'link' },
    ];
    const tested = CommonReducers(state, CommonAction.sliceHistory(history));
    expect(tested.history).toHaveLength(0);
  });

  test('Given CommonReducer When setScrools Then scroll from state is update', () => {
    state.scrolls = [{ pathname: '/', position: 0 }];
    const scroll = { pathname: 'pathname2', position: 1000 };
    const tested = CommonReducers(state, CommonAction.setScrools(scroll));
    expect(Object.entries(tested.scrolls)).toHaveLength(2);
  });

  test('Given CommonReducer When setScrools Then scroll from state is update', () => {
    CommonReducers(state, CommonAction.setModeTheme('dark'));
    CommonReducers(state, CommonAction.setLanguage('fr'));
  });
});
