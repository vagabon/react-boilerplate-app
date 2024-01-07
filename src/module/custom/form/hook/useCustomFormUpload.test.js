import { render } from '@testing-library/react';
import { useEffect } from 'react';
import { ApiService } from '../../../../api/service/ApiService';
import { useCustomFormUpload } from './useCustomFormUpload';

describe('useCustomFormUpload', () => {
  test('Given useCustomFormUpload when uploadImage then ApiService is called', () => {
    const mockApiService = jest.spyOn(ApiService, 'post').mockReturnValue(Promise.resolve({}));
    const mockCallback = jest.fn();
    const ReactTested = () => {
      const { handleChangeFile } = useCustomFormUpload('endpoint');
      useEffect(() => {
        handleChangeFile(1, mockCallback)('name', {});
      }, [handleChangeFile]);
      return <></>;
    };
    render(<ReactTested />);
    expect(mockApiService).toBeCalledTimes(1);
  });
});
