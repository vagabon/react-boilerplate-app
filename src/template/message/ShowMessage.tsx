import { I18nUtils, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import { closeSnackbar, useSnackbar } from 'notistack';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../store/Store';

const ShowMessage: React.FC = () => {
  const { t } = useAppTranslate();
  const { message } = useAppSelector((state) => state.common);
  const { enqueueSnackbar } = useSnackbar();
  const lastMessage = useRef<string>();

  useEffect(() => {
    if (message.id !== '' && message.message !== '' && message.message !== lastMessage.current) {
      lastMessage.current = message.message;
      enqueueSnackbar(I18nUtils.translate(t, message.message), {
        variant: message.type,
        autoHideDuration: 3000,
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        onClick: () => {
          closeSnackbar();
          lastMessage.current = '';
        },
        onclose: () => {
          lastMessage.current = '';
        },
      });
    }
  }, [t, message, enqueueSnackbar]);

  return <></>;
};

export default ShowMessage;
