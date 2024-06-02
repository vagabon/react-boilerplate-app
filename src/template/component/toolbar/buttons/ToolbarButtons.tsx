import { IconClickable } from '@vagabond-inc/react-boilerplate-md/dist/icon/component/IconClickable';
import { MdAvatar } from '@vagabond-inc/react-boilerplate-md/dist/md/component/avatar/MdAvatar';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { useAppRouter } from '@vagabond-inc/react-boilerplate-md/dist/router/hook/useAppRouter';
import { useAppImage } from '../../../../app/image/hook/useAppImage';
import { useAppSelector } from '../../../../store/Store';

export interface IToolbarButtonsProps {
  apiUrl: string;
}

const ToolbarButtons: React.FC<IToolbarButtonsProps> = ({ apiUrl }) => {
  const { handleNavigate } = useAppRouter();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const username = useAppSelector((state) => state.auth.user?.user?.username);
  const avatar = useAppSelector((state) => state.auth.user?.user?.avatar);
  const { getImage } = useAppImage(apiUrl);

  return (
    <>
      <MdButton url='/auth/signup' label='AUTH:SIGNUP' color='inherit' variant='outlined' show={!isLoggedIn} />
      <MdButton url='/auth/signin' label='AUTH:SIGNIN' color='inherit' variant='outlined' show={!isLoggedIn} />
      {username && (
        <IconClickable callback={handleNavigate('/profile')}>
          <MdAvatar name={username as string} image={getImage(avatar)} />
        </IconClickable>
      )}
    </>
  );
};
export default ToolbarButtons;
