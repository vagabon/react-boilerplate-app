import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { useAppSelector } from '../../../../store/Store';

export interface IToolbarButtonsProps {}

const ToolbarButtons: React.FC<IToolbarButtonsProps> = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <>
      <MdButton url='/auth/signup' label='AUTH:SIGNUP' variant='outlined' show={!isLoggedIn} />
      <MdButton url='/auth/signin' label='AUTH:SIGNIN' variant='contained' color='secondary' show={!isLoggedIn} />
    </>
  );
};
export default ToolbarButtons;
