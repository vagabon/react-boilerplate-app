import FacebookLogin from '@greatsumini/react-facebook-login';
import { MdButton } from '@vagabond-inc/react-boilerplate-md/dist/md/component/button/MdButton';
import { memo } from 'react';
import { useAuth } from '../../../hook/useAuth';

export interface ILoginFacebookProps {
  apiUrl: string;
  facebookClientId: string;
}

export const LoginFacebook: React.FC<ILoginFacebookProps> = memo(({ apiUrl, facebookClientId }) => {
  const { handleFacebookLogin } = useAuth(apiUrl);

  return (
    <FacebookLogin
      appId={facebookClientId}
      onSuccess={(response) => {
        handleFacebookLogin(response.accessToken);
      }}
      onFail={(error) => {
        console.error('Facebook Login Failed !', error);
      }}
      render={({ onClick }) => (
        <MdButton
          label='AUTH:LOGIN.FACEBOOK'
          variant='outlined'
          size='large'
          color='facebook'
          startIcon='facebook'
          callback={onClick}
          fullWidth
        />
      )}
    />
  );
});
