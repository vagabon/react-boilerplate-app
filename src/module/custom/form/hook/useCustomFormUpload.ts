import { HandleChangeType, ID } from '@vagabond-inc/react-boilerplate-md';
import { useCallback } from 'react';
import { ApiService } from '../../../../api/service/ApiService';

export const useCustomFormUpload = (endPoint: string) => {
  const uploadImage = useCallback(
    (id: ID, file: File | undefined) => {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
      return ApiService.post('/' + endPoint + '/upload?id=' + id, formData, {
        'Content-Type': 'multipart/form-data',
      });
    },
    [endPoint],
  );

  const handleChangeFile = useCallback(
    (id: ID, callback?: HandleChangeType) => (name: string, file: File) => {
      uploadImage(id, file).then((data) => {
        const event = { target: { name, value: data } };
        console.log('FILE UPLOAD : ', data, event);
        callback?.(event);
      });
    },
    [uploadImage],
  );

  return { handleChangeFile };
};
