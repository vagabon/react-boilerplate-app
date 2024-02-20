import { closeSnackbar, useSnackbar } from 'notistack';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../store/Store';

const ShowMessage: React.FC = () => {
  const { message } = useAppSelector((state) => state.common);
  const { enqueueSnackbar } = useSnackbar();
  const lastMessage = useRef<string>();

  useEffect(() => {
    if (message.id !== '' && message.message !== '' && message.message !== lastMessage.current) {
      lastMessage.current = message.message;
      enqueueSnackbar(message.message, {
        variant: message.type,
        autoHideDuration: 5000,
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
  }, [message, enqueueSnackbar]);

  return <></>;
};

export default ShowMessage;
