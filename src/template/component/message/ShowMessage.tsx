import { I18nUtils, useAppTranslate } from '@vagabond-inc/react-boilerplate-md';
import { closeSnackbar, useSnackbar } from 'notistack';
import { memo, useEffect, useRef } from 'react';
import { useAppSelector } from '../../../store/Store';

const ShowMessage: React.FC = memo(() => {
  const { t } = useAppTranslate();
  const { message } = useAppSelector((state) => state.common);
  const { enqueueSnackbar } = useSnackbar();
  const lastMessage = useRef<string>();

  useEffect(() => {
    if (message.id !== '' && message.message !== '' && message.message !== lastMessage.current) {
      lastMessage.current = message.message;
      const messages = message.message.split(';');
      enqueueSnackbar(I18nUtils.translate(t, messages[0]), {
        variant: message.type,
        autoHideDuration: 3000,
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        onClick: () => {
          closeSnackbar();
        },
      });
      setTimeout(() => {
        lastMessage.current = '';
      }, 3000);
    }
  }, [t, message, enqueueSnackbar]);

  return <></>;
});

export default ShowMessage;
