import { HandleChangeType, JSONObject, ObjectUtils } from '@vagabond-inc/react-boilerplate-md';
import { useCallback } from 'react';
import { ApiService } from '../../../../api/service/ApiService';

export const useCustomFormUpload = (apiUrl: string, endPoint: string) => {
  const uploadImage = useCallback(
    (file: File | undefined) => {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
      return ApiService.post(apiUrl, '/file/upload?directory=' + endPoint, formData, {
        'Content-Type': 'multipart/form-data',
      });
    },
    [apiUrl, endPoint],
  );

  const handleChangeFile = useCallback(
    (callback?: HandleChangeType) => (name: string, file: File) => {
      uploadImage(file).then((data) => {
        const event = { target: { name, value: ObjectUtils.getDtoString(data as JSONObject, 'path') } };
        callback?.(event);
      });
    },
    [uploadImage],
  );

  return { handleChangeFile };
};
