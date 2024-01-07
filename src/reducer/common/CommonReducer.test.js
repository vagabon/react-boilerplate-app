import CommonReducers, { CommonAction } from './CommonReducer';

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
    expect(tested.message).toBe('test');
    expect(tested.type).toBe('error');
    expect(tested.button).toBe(undefined);
  });

  test('Given CommonReducer When setMessageButton Then message button from state is update with default value', () => {
    const data = {};
    const tested = CommonReducers(state, CommonAction.setMessageButton(data));
    expect(tested.message).toBe('');
    expect(tested.type).toBe('success');
    expect(tested.button.label).toBe('Retour');
    expect(tested.button.url).toBe('/home');
  });

  test('Given CommonReducer When setMessageButton with a label and an url Then message button from state is update', () => {
    const data = { label: 'Test', url: '/test' };
    const tested = CommonReducers({ history: [{ link: '/plouf' }] }, CommonAction.setMessageButton(data));
    expect(tested.button.label).toBe('Test');
    expect(tested.button.url).toBe('/test');
  });

  test('Given CommonReducer When setMessageButton with a an history Then message button from state is update', () => {
    const data = { label: 'Test' };
    const tested = CommonReducers(
      { history: [{ link: '/previus' }, { link: '/plouf' }] },
      CommonAction.setMessageButton(data),
    );
    expect(tested.button.label).toBe('Test');
    expect(tested.button.url).toBe('/previus');
  });

  test('Given CommonReducer When clearMessage Then message from state is empty', () => {
    const tested = CommonReducers(state, CommonAction.clearMessage());
    expect(tested.message).toBe('');
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
    const history = { id: '1', title: 'title', link: '/home' };
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
    state.scrolls = { pathname: 0 };
    const scroll = { pathname: 'pathname2', position: 1000 };
    const tested = CommonReducers(state, CommonAction.setScrools(scroll));
    expect(Object.entries(tested.scrolls)).toHaveLength(2);
  });
});
