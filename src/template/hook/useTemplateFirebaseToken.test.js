import { renderHook } from '@testing-library/react';
import { ApiService } from '../../api/service/ApiService';
import { useTemplateFirebaseToken } from './useTemplateFirebaseToken';

describe('useTemplateFirebaseToken', () => {
  test('Given useTemplateFirebaseToken when is mount Then ', async () => {
    useAppSelectorSpy.mockImplementation((callback) =>
      callback({
        auth: { user: { user: { id: 1 } } },
      }),
    );
    const mockCallback = jest.fn().mockImplementation(() => Promise.resolve('token'));
    const mockApiService = jest.spyOn(ApiService, 'put').mockReturnValue(Promise.resolve({ token: 'newToken' }));

    await renderHook(() => useTemplateFirebaseToken('apiUrl', mockCallback));
    expect(mockApiService).toBeCalled();

    jest.clearAllMocks();

    await renderHook(() => useTemplateFirebaseToken('apiUrl', undefined));
    expect(mockApiService).not.toBeCalled();
  });
});
