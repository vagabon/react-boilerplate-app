import { useCallback } from 'react';

export const useAppImage = (apiUri: string) => {
  const getImage = useCallback(
    (image: string) => {
      if (
        image &&
        image !== null &&
        image !== '' &&
        image.includes('/') &&
        !image?.includes('http://') &&
        !image?.includes('data:image/') &&
        !image?.startsWith('https://')
      ) {
        return apiUri + '/download?fileName=' + image;
      }
      return image;
    },
    [apiUri],
  );

  return { getImage };
};
