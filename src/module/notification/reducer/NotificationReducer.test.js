import NotificationReducers, { NotificationAction } from './NotificationReducer';

const state = {
  datas: [{ id: 1 }],
  data: [],
  actives: [],
  top10s: [],
  nbNotification: 0,
};

describe('NotificationReducer', () => {
  test('Given NotificationReducer when replaceItem then state is merged', () => {
    const datas = { id: 1 };
    const tested = NotificationReducers(state, NotificationAction.replaceItem(state, { payload: datas }));
    expect(tested.datas.length).toBe(1);

    const tested2 = NotificationReducers(state, NotificationAction.readAll(state, { payload: datas }));
    expect(tested2.datas.length).toBe(1);

    NotificationReducers(state, NotificationAction.setNbNotification(state, { payload: 1 }));

    const tested4 = NotificationReducers(state, NotificationAction.addNbNotification(state, { payload: 1 }));
    expect(tested4.nbNotification).toBe(0);
  });
});
