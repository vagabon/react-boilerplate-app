import { closeSnackbar, useSnackbar } from 'notistack';
import { memo, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../../store/Store';

export const ShowMessage: React.FC = memo(() => {
  const { t } = useTranslation();
  const message = useAppSelector((state) => state.common.message, shallowEqual);
  const { enqueueSnackbar } = useSnackbar();
  const lastMessage = useRef<string>();

  useEffect(() => {
    if (message.id !== '' && message.message !== '' && message.message !== lastMessage.current) {
      lastMessage.current = message.message;
      const messages = message.message.split(';');
      enqueueSnackbar(t(messages[0]), {
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
