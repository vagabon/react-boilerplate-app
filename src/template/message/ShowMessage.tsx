import { MdSnackbar } from '@vagabond-inc/react-boilerplate-md';
import { useAppSelector } from '../../store/Store';

const ShowMessage: React.FC = () => {
  const { message, type } = useAppSelector((state) => state.common);

  return <MdSnackbar message={message} type={type} />;
};

export default ShowMessage;
