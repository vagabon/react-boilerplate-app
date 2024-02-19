import { closeSnackbar, useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useAppSelector } from '../../store/Store';

const ShowMessage: React.FC = () => {
  const { message } = useAppSelector((state) => state.common);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    message.id !== '' &&
      message.message !== '' &&
      enqueueSnackbar(message.message, {
        variant: message.type,
        autoHideDuration: 5000,
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
        onClick: () => {
          closeSnackbar();
        },
      });
  }, [message, enqueueSnackbar]);

  return <></>;
};

export default ShowMessage;
