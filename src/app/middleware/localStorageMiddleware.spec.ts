/* eslint-disable no-proto */
/* eslint-disable no-undef */
import { APPLICATION_STATE_KEY, hydrateStore, localStorageMiddleware } from './localStorageMiddleware';

const initialState = {
  github: {
    starred: [],
  },
};

const create = () => {
  const store = {
    getState: jest.fn(() => initialState),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const invoke = (action: any) => localStorageMiddleware(store)(next)(action);

  return { store, next, invoke };
};

describe('localStorageテスト', () => {
  it('localStorageに保存出来ているか', () => {
    jest.spyOn(window.localStorage.__proto__, 'setItem');

    const { next, invoke } = create();

    const action = jest.fn();

    invoke(action);

    expect(next).toBeCalledWith(action);

    expect(localStorage.setItem).toBeCalledWith(APPLICATION_STATE_KEY, JSON.stringify(initialState));
  });
});

describe('永続化テスト', () => {
  it('localStorageによる永続化が出来ているか', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');

    hydrateStore();

    expect(localStorage.getItem).toBeCalledWith(APPLICATION_STATE_KEY);
  });

  it('localStorageにデータがない場合', () => {
    window.localStorage.__proto__.getItem = jest.fn().mockImplementationOnce(() => null);

    expect(hydrateStore()).toBeUndefined();
  });

  it('localStorageにデータがある場合', () => {
    window.localStorage.__proto__.getItem = jest.fn().mockImplementationOnce(() => JSON.stringify(initialState));

    expect(hydrateStore()).toEqual(initialState);
  });
});
