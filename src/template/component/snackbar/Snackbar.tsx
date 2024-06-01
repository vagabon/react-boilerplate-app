import { useTranslate } from '@vagabond-inc/react-boilerplate-md/dist/translate/hook/useTranslate';
import { closeSnackbar, useSnackbar } from 'notistack';
import { memo, useEffect, useRef } from 'react';
import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../../store/Store';

export const Snackbar: React.FC = memo(() => {
  const { translate } = useTranslate();
  const messageId = useAppSelector((state) => state.common.message.id, shallowEqual);
  const messageType = useAppSelector((state) => state.common.message.type, shallowEqual);
  const messageContent = useAppSelector((state) => state.common.message.message, shallowEqual);
  const { enqueueSnackbar } = useSnackbar();
  const lastMessage = useRef<string>('');

  useEffect(() => {
    if (messageId !== '' && messageContent !== '' && messageContent !== lastMessage.current) {
      lastMessage.current = messageContent;
      const messages = messageContent.split(';');
      enqueueSnackbar(translate(messages[0]), {
        variant: messageType,
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
  }, [translate, messageId, messageContent, messageType, enqueueSnackbar]);

  return <></>;
});
